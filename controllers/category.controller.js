const { productModel } = require("../models/product.model")

// Controller function to list all categories
const listCategories = async (req, res) => {
  try {
    // Use aggregation to find distinct categories
    const categories = await productModel.distinct('category');

    // Send the list of categories as a response
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports={
  listCategories
}