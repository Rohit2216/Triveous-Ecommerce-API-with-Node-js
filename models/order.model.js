const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
}, {
  versionKey: false
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = { orderModel }