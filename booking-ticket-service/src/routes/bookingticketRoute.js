const express = require('express');
const router = express.Router();
const BookingController = require('../controller/BookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, BookingController.createBooking);
router.get('/my-bookings', authMiddleware, BookingController.getBookings);
router.get('/all-bookings', BookingController.getAllBookings);

module.exports = router;