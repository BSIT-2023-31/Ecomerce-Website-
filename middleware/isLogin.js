const jwt = require('jsonwebtoken');
const userModel = require('../models/userMode');

module.exports = async function (req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, 'heyheyheyheyheyhey');
        const user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            return res.status(401).send("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).send("Invalid token");
    }
};