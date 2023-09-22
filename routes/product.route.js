const express = require("express")
const productRouter = express.Router()
const productController = require("../controllers/product.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

productRouter.post("/add", Authentication(["admin"]), productController.addProduct)
productRouter.get("/", productController.getAllProducts)
productRouter.get("/getbycategory/:category", productController.getProductsByCategory)
productRouter.get("/getbyid/:productId", productController.getProductById)

module.exports = { productRouter }