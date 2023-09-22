const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
}, {
    versionKey: false
})

const productModel = mongoose.model("product", productSchema)

module.exports = { productModel }