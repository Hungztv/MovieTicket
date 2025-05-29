const express = require('express');
const router = express.Router();
const BookingController = require('../controller/bookingController');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

router.post('/create', authMiddleware, BookingController.createBooking);
router.get('/my-bookings', authMiddleware, BookingController.getBookings);
router.get('/all-bookings', BookingController.getAllBookings);

module.exports = router;