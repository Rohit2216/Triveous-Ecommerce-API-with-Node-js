const express = require("express")
const productRouter = express.Router()

const productController = require("../controllers/product.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

productRouter.post("/addproduct", Authentication(["admin"]), productController.addProduct)
productRouter.get("/getproduct", productController.getAllProducts)
productRouter.get("/getbycategory/:category", productController.getProductsByCategory)
productRouter.get("/getbyid/:productId", productController.getProductById)

module.exports = {
    productRouter 
}