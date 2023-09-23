const { ResponseDTO } = require('../dtos/Response')
const productsData    = require('../data/productsData')

exports.postProduct = async (name, description, price, quantity, category) => {
    try {
        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (!description) {
            return new ResponseDTO('Error', 400, 'Descrição não preenchida')
        }

        if (!price) {
            return new ResponseDTO('Error', 400, 'Preço não preenchido')
        }

        if (!quantity) {
            return new ResponseDTO('Error', 400, 'Quantidade não preenchida')
        }

        if (!category) {
            return new ResponseDTO('Error', 400, 'Categoria não preenchida')
        }
    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }

    const response = await productsData.postProduct(name, description, price, quantity, category)

    return new ResponseDTO('Success', 200, response)

}

exports.getProducts = async () => {
    try {
        const response = await productsData.getProducts()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getProductById = async (id) => {
    try {
        const response = await productsData.getProductById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}