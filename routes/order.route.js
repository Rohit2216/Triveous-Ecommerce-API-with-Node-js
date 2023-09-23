const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/order.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

orderRouter.post("/placeorder", Authentication(["admin", "user"]), orderController.placeOrder)
orderRouter.get("/getorder", Authentication(["admin", "user"]), orderController.getOrder)
orderRouter.get("/getorderbyid/:id", Authentication(["admin", "user"]), orderController.getOrderById)

module.exports = { 
    orderRouter 
}