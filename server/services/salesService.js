const { ResponseDTO } = require('../dtos/Response')
const salesData       = require('../data/salesData')
const productsData    = require('../data/productsData')
const usersData       = require('../data/usersData')

exports.postSales = async (quantity, total_price, productId, userId) => {
    try {
        if (!quantity) {
            return new ResponseDTO('Error', 400, 'Quantidade em estoque não preenchida')
        }

        if (!total_price) {
            return new ResponseDTO('Error', 400, 'Preço total a ser pago não preenchido')
        }

        if (!productId) {
            return new ResponseDTO('Error', 400, 'Id do produto não preenchido')
        }

        const product = await productsData.getProductById(productId)

        if (!product) {
            return new ResponseDTO('Error', 400, 'O produto com este id não existe')
        }

        if (!userId) {
            return new ResponseDTO('Error', 400, 'Id do usuário não preenchido')
        }

        if (!await usersData.getUserById(userId)) {
            return new ResponseDTO('Error', 400, 'O usuário com este id não existe')
        }

        const decrementProduct = await productsData.decrementQuantityById(productId, 1)

        if (decrementProduct.acknowledged == true && decrementProduct.modifiedCount == 1) {
            const response = await salesData.postSales(quantity, total_price, productId, product['category'], userId)

            return new ResponseDTO('Success', 200, 'ok', response)
        } else {
            return new ResponseDTO('Error', 500, 'Erro no servidor/banco de dados')
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllSales = async () => {
    try {
        const response = await salesData.getAllSales()
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSalesById = async (id) => {
    try {
        const response = await salesData.getSalesById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSalesByCategory = async (category) => {
    try {
        const response = await salesData.getSalesByCategory(category)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSalesByProductId = async (id) => {
    try {
        const response = await salesData.getSalesByProductId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateSalesById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo que deseja ser atualizado não preenchido.')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor do campo que deseja ser atualizado não preenchido.')
        }

        const sales = await salesData.getSalesById(id)

        if (!sales) {
            return new ResponseDTO('Error', 404, 'Registro de venda não encontrado')
        }

        sales[field] = value

        await sales.validate()
        await sales.save()

        const response = await salesData.getSalesById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteSalesById = async (id) => {
    try {
        const response = await salesData.deleteSalesById(id)
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}