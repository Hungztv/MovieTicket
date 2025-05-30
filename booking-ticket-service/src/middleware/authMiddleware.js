const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Token received in booking-ticket-service:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Verifying token:', token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded user:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('JWT verification error:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;