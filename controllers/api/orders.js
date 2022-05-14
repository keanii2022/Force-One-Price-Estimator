const Order = require('../../models/order')

module.exports= {
    cart,
    addToCart,
    setServiceQtyInCart,
    checkout
}

async function cart(req,res) {
    const cart = await Order.getCart(req.user._id)
    res.json(cart)
}

async function addToCart(req, res) {
    const cart = await Order.getCart(req.user._id)
    await cart.addServiceToCart(req.params.id)
    res.json(cart)
}

async function setServiceQtyInCart(req,res) {
    const cart = await Order.getCart(req.user._id)
    await cart.setServiceQtyInCart(req.body.serviceId, req.body.newQty)
    res.json(cart)
}

async function checkout(req,res) {
    const cart = await Order.getCart(req.user._id)
    cart.isPaid = true
    await cart.save()
    res.json(cart)

}
