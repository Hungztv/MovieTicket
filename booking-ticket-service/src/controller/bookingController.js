const bookingService = require('../service/bookingService');

class BookingController {
    async createBooking(req, res) {
        try {
            const userId = req.user.id;
            if (!req.body.movieId || !req.body.seatNumber) {
                return res.status(400).json({ message: 'Show ID and seat numbers are required' });
            }


            const booking = await bookingService.createBooking(userId, req.body);
            res.status(201).json({ message: 'Booking created successfully', booking });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getBookings(req, res) {
        try {
            const userId = req.user.id; // Lấy từ token qua authMiddleware
            const bookings = await bookingService.getBookingsByUserId(userId);
            res.status(200).json({ message: 'Bookings retrieved successfully', bookings });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await bookingService.getAllBookings();
            res.status(200).json({ message: 'All bookings retrieved successfully', bookings });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new BookingController();