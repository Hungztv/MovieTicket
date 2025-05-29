const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (userData) => {
    try {
        const { firstName, lastName, username, email, password, phone, address } = userData;
        const existingUser = await User.findOne({ $or: [{ email }, { username }, { phone }] });
        if (existingUser) {
            throw new Error('Email, username, or phone already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            phone,
            address,
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
};