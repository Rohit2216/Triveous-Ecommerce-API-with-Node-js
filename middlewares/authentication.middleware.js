const jwt = require("jsonwebtoken");
const { blacklistModel } = require("../models/blacklist.model");

const Authentication = (roles) => {

    const userAuth = async (req, res, next) => {

        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).send({ "msg": "Token not found" })
            }
            let blacklistedUser = await blacklistModel.findOne({ token: token })
            if (blacklistedUser) {
                return res.status(401).send({ "msg": "Token is expired" })
            }
            const decoded = jwt.verify(token, process.env.secret_key)
            if (decoded) {

                if (!roles.includes(decoded.role)) {
                    return res.status(401).send({ "msg": "Not authorized!" })
                }

                req.body.userId = decoded.userId
                req.body.email = decoded.email
                next();

            } else {
                res.status(400).send({ "msg": "Please login first" })
            }



        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    return userAuth
}



module.exports = { Authentication };