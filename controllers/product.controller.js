const { productModel } = require("../models/product.model")

// Add product
const addProduct = async (req, res) => {
    const { title, price, description, availability, category } = req.body

    try {
        let newProduct = new productModel({ title, price, description, availability, category })
        await newProduct.save()
        return res.status(200).send({ "msg": "Product added!" })
    } catch (error) {
        return res.status(400).send({ "msg": error.message })
    }
}

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await productModel.find({ category });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports={
    getAllProducts,
    getProductsByCategory,
    getProductById,
    addProduct

}