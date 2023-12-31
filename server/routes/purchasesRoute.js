const express = require('express')
const router  = express.Router()
const purchasesController = require('../controllers/purchasesController')

router.post('/', purchasesController.postPurchase)
router.post('/filter', purchasesController.getPurchaseByFilter)

router.get('/product/:id', purchasesController.getPurchaseByProductId)
router.get('/', purchasesController.getAllPurchases)
router.get('/:id', purchasesController.getPurchaseById)

router.delete('/', purchasesController.cleanDatabase)

// router.get('/category/:category', purchasesController.getPurchaseByCategory)

// router.get('/product/:id', purchasesController.getSalesByProductId)

// router.patch('/:id', purchasesController.updateSalesById)

// router.delete('/:id', purchasesController.deleteSalesById)

module.exports = router