
const { userModel } = require("../models/user.model")
const mongoose = require("mongoose")

// Route for adding a product to the user's cart
const additem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if the product is already in the user's cart
        const isProductInCart = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                    cart: { $elemMatch: { product: new mongoose.Types.ObjectId(productId) } }
                }
            }
        ]);


        if (isProductInCart.length > 0) {
            return res.send({ "msg": "Product already in cart" });
        } else {
            // Add the product to the user's cart
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $push: { cart: { product: productId, quantity: quantity } } },
                { new: true }
            ).exec();

            res.status(200).send({ "msg": "Product added to cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getcart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by ID
        const user = await userModel.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'product',
                model: 'product'
            }
        }).exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }


        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Route for deleting a product from the user's cart or clearing the entire cart

const deleteitem = async (req, res) => {
    let id = req.params.id;
    const userId = req.body.userId;

    if (id) {
        try {
            // Remove a specific product from the user's cart
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $pull: { cart: { product: id } } },
                { new: true }
            ).exec();

            if (user) {
                return res.status(204).send({ "msg": "Product removed from cart!" });
            } else {
                return res.status(404).send({ "msg": "No such item" });
            }
        } catch (error) {
            return res.status(500).send({ "msg": error.message });
        }
    } else {
        try {
            // Clear the entire cart
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $pull: { mycart: [] } },
                { new: true }
            ).exec();
            return res.send({ "msg": "Cart is cleared" });
        } catch (error) {
            return res.status(500).send({ "msg": "Internal server error" });
        }
    }
};




// Update the quantity of a product in the user's cart
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find the user by ID
        const user = await userModel.findOneAndUpdate(
            { _id: userId, 'cart.product': productId }, // Find the user and the specific cart item by product ID
            { $set: { 'cart.$.quantity': quantity } }, // Update the quantity of the specific cart item
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found or product not in cart' });
        }

        res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports={
    additem,
    getcart,
    deleteitem,
    updateCartItemQuantity
}