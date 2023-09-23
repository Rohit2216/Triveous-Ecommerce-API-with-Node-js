const express = require("express")
const cartRouter = express.Router()
const cartController = require("../controllers/cart.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

cartRouter.post("/addcart", Authentication(["admin", "user"]), cartController.additem)
cartRouter.get("/getcart", Authentication(["admin", "user"]), cartController.getcart)
cartRouter.delete("/deletecart/:id", Authentication(["admin", "user"]), cartController.deleteitem)
cartRouter.put('/updatequantity', Authentication(["admin", "user"]), cartController.updateCartItemQuantity);

module.exports = { 
    cartRouter 
}