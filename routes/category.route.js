const express = require("express")
const categoryRouter = express.Router()
const categoryController = require("../controllers/category.controller")

categoryRouter.get('/list', categoryController.listCategories);

module.exports = { categoryRouter }