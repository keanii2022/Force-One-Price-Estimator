const mongoose = require('mongoose')
const Schema = mongoose.Schema
const serviceSchema = require('./serviceSchema')

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    service: serviceSchema
},{
    timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.service.price
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, service) => total + service.qty, 0)
})
orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, service) => total + service.qty, 0)
})
orderSchema.virtual('orderId').get(function(){
    return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        // upsert creates doc if it doesn't exist
        { upsert: true, new: true }
    )
}

orderSchema.methods.addServiceToCart = async function(serviceId) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.service._id.equals(serviceId))
    if (lineItem) {
        lineItem.qty += 1;
    } else {
        const service = await mongoose.model('Service').findById(serviceId)
        cart.lineItems.push({ service })
    }
    return cart.save()
}

orderSchema.methods.setItemQty = function(serviceId, newQty) {
    const cart = this
    const lineItem = cart.lineItems.find(lineItem => lineItem.service._id.equals(serviceId))
    if (lineItem && newQty <= 0 ) {
        lineItem.remove()
    } else if (lineItem) {
        lineItem.qty = newQty
    }
    return cart.save()
}

module.exports = mongoose.model('Order', orderSchema)