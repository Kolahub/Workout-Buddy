const express = require('express');
const cookieParser = require('cookie-parser');
const User = require('../Models/userModule');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        // set token in a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 }); // 3 days

        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        // create a token
        const token = createToken(user._id);

        // set token in a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 }); // 3 days

        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    signupUser,
    loginUser
};