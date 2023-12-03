const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async function (req, res, next){
    if (!req.cookies.token) {
        next()
        return
    }

    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.userId)
    req.userId = user?._id
    next()
}