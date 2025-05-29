const authService = require('../service/authService');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, phone, address } = req.body;
        const user = await authService.registerUser({ firstName, lastName, username, email, password, phone, address });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};