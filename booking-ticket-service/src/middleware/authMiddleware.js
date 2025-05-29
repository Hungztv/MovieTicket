const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Thay bằng key bí mật của bạn

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Gắn thông tin user (id, email) vào request

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = authMiddleware;