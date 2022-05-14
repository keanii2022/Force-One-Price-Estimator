const Schema = require('mongoose').Schema

const serviceSchema = new Schema({
    service: { type: String, required:true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true, default: 0 }
},{
    timestamps: true
})