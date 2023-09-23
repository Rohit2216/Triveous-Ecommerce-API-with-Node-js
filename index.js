const express = require("express")
require("dotenv").config()
const { connection } = require("./configs/db")

const cors = require("cors")

const app = express()

const { userRouter } = require("./routes/user.route")
const { productRouter } = require("./routes/product.route")
const { cartRouter } = require("./routes/cart.route")
const { orderRouter } = require("./routes/order.route")
const { categoryRouter } = require("./routes/category.route")

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Welcome to Triveous" })
})

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/category", categoryRouter)


app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("Database connected!")
    } catch (error) {
        console.log("Database not connected!")
        console.log(error)
    }
    console.log(`Server is running on port :${process.env.port}`)
})