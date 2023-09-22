const { Product } = require("../models/product.model");

// Assuming you have the Category and User models defined in your Mongoose application
const Category = require("../models/category.model");
const User = require("../models/user.model");

async function fetchingProducts(req, res) {
    try {
        const { id, title, availability, category } = req.query;

        const query = {}; // Initialize an empty query object

        if (id) {
            query._id = id;
        }
        if (title) {
            query.title = title;
        }
        if (availability) {
            query.availability = availability;
        }
        if (category) {
            const categoryObj = await Category.findOne({ name: category });
            if (categoryObj) {
                query.categoryID = categoryObj._id;
            }
        }

        const product = await Product.findOne(query).populate("categoryID", "name");

        if (product) {
            return res.status(200).json({
                status: true,
                data: product
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

async function addingProducts(req, res) {
    try {
        const { title, price, description, availability, category } = req.body;

        // Assuming you have a user object associated with the request, e.g., req.user
        const user = req.user;

        // Find the category by name
        const categoryObj = await Category.findOne({ name: category });

        if (!categoryObj) {
            return res.status(400).json({
                status: false,
                message: "Category not found"
            });
        }

        const product = new Product({
            title,
            price,
            description,
            availability,
            categoryID: categoryObj._id,
            sellerID: user._id
        });

        await product.save();

        return res.status(200).json({
            status: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    fetchingProducts,
    addingProducts
};
