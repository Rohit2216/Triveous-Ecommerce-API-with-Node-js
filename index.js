const express=require("express")
const { connection } = require("./config/db")
const { categoryRouter } = require("./route/category.route")
require("dotenv").config()
const {userRouter}=require("./route/user.route")
const app=express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Welcome to Triveous" })
})

app.use("/user",userRouter)
app.use("/ctg",categoryRouter)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Database connected.")
    } catch (error) {
        console.log("Database not Connected.")
        console.error(error)
    }
    console.log(`Server is running on port: ${process.env.port}`)
})