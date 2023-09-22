const express = require("express")
const orderRouter = express.Router()
const orderController = require("../controllers/order.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

orderRouter.post("/place-order", Authentication(["admin", "user"]), orderController.placeOrder)
orderRouter.get("/get-order", Authentication(["admin", "user"]), orderController.getOrder)
orderRouter.get("/get-order-by-id/:id", Authentication(["admin", "user"]), orderController.getOrderById)

module.exports = { orderRouter }