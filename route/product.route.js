const express = require('express');
const { addingProducts, fetchingProducts } = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.post('/add', addingProducts);

productRouter.get('/', fetchingProducts);


module.exports = { productRouter };