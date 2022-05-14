const express = require('express')
const router = express.Router()
const ordersCtrl = require('../../controllers/api/orders')

router.get('/cart', ordersCtrl.cart)
router.post('/cart/services/:id', ordersCtrl.addToCart)
router.post('/cart/checkout', ordersCtrl.checkout)
router.put('/cart/qty', ordersCtrl.setServiceQtyInCart)

module.exports = router