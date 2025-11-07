const express = require('express');
const userModel = require('../models/userMode');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const productModel = require('../models/producModel')
// Home route
router.get('/', (req, res) => {
    res.send("Hello world");
});

// Register route
router.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send("Your Email is already registered");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ email, id: user._id }, "heyheyheyheyheyhey");
        res.cookie('token', token);

        // 🔁 Fetch products and render shop
        const products = await productModel.find();
        res.render('shop', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send("Email or Password incorrect");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Email or Password incorrect");
        }

        const token = jwt.sign({ email, id: user._id }, "heyheyheyheyheyhey");
        res.cookie('token', token, { httpOnly: true });

        // 🔁 Fetch products and render shop
        const products = await productModel.find();
        res.render('shop', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Shop route
router.get('/shop', async (req, res) => {
    try {
        const products = await productModel.find();
        res.render('shop', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;