const mongoose = require('mongoose') 
require('./category')
const serviceSchema = require('./serviceSchema')

module.exports = mongoose.model('Service', serviceSchema)
