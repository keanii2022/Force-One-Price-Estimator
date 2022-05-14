const Service = require ('../../models/service')

module.exports = {
    index,
    show
}

async function index(req,res) {
    const services = await Service.find({}).sort('name').populate('category').exec()
    services.sort((a, b) => a.category.sortOrder - b.category.sortOrder)
    res.json(services)
}

async function show(req,res) {
    const service = await Service.findById(req.params.id)
    res.json(service)
}