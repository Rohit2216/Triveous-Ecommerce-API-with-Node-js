const express = require("express")
const cartRouter = express.Router()
const cartController = require("../controllers/cart.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

cartRouter.post("/add", Authentication(["admin", "user"]), cartController.additem)
cartRouter.get("/get", Authentication(["admin", "user"]), cartController.getcart)
cartRouter.delete("/delete/:id", Authentication(["admin", "user"]), cartController.deleteitem)
cartRouter.put('/update-quantity', Authentication(["admin", "user"]), cartController.updateCartItemQuantity);

module.exports = { cartRouter }