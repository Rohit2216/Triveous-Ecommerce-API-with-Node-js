const { orderModel } = require("../models/order.model")
const { userModel } = require("../models/user.model")

const placeOrder = async (req, res) => {
    const { userId, email } = req.body
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const userPopulated = await userModel.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'product',
                model: 'product'
            }
        }).exec();
        const totalAmount = userPopulated.cart.reduce((total, product) => {
            const productAmount = product.product.price * product.quantity;
            return total + productAmount;
        }, 0);


        const order = new orderModel({ email, products: user.cart, amount: totalAmount })
        await order.save()
        res.status(200).send({ "msg": "Order Placed!" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOrder = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by ID
        const order = await orderModel.find({email}).populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'product'
            }
        }).exec();

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const { email } = req.body;

        // Find the user by ID
        const order = await orderModel.findById(id).populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'product'
            }
        }).exec();

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports={
    getOrder,
    placeOrder,
    getOrderById
}