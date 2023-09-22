const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { userModel } = require("../models/user.model")
const { blacklistModel } = require("../models/blacklist.model")


const register = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const user = await userModel.findOne({ email })

        if (user) {
            res.status(400).send({ "msg": "User already exist!" })
        } else {
            bcrypt.hash(password, 3).then(async (hash) => {
                const user = new userModel({ name, email, password: hash, role })
                await user.save()
                res.status(200).send({ "msg": "Registeration completed!" })
            });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}



const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.secret_key, { expiresIn: '3h' });
                    res.status(200).send({ "msg": "Sign In Successfully!", token, userID: user._id })
                } else {
                    res.status(400).send({ "msg": "Incorrect Password" })
                }
            });
        } else {
            res.status(404).send({ "msg": "No user found with given email" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}



const logout = async (req, res) => {
    const { token } = req.params;
    console.log(token)
    try {
        let newBlacklistToken = new blacklistModel({ token: token });
        await newBlacklistToken.save();
        return res.send({ "msg": "Logout successful" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
}


module.exports={
    login,
    register,
    logout
}