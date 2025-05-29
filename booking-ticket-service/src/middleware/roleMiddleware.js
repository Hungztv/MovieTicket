const User = require('../model/userModel');

const roleMiddleware = (requiredRole) => async (req, res, next) => {
    try {
        const userId = req.user.id; // Lấy từ token qua authMiddleware

        // Tìm user trong database để lấy role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra role
        if (user.role !== requiredRole) {
            return res.status(403).json({ message: `Access denied. ${requiredRole} role required.` });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error verifying role', error: error.message });
    }
};

module.exports = roleMiddleware;