const express = require('express');
const { fetchingCategories, addingCategories } = require('../controllers/category.controller');
const categoryRouter = express.Router();


categoryRouter.get('/', fetchingCategories);

categoryRouter.post('/add', addingCategories);

module.exports = { categoryRouter };