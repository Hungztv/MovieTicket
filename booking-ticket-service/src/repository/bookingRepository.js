const Booking = require('../model/bookingModel');

class BookingRepository {
    async create(bookingData) {
        const booking = new Booking(bookingData);
        return await booking.save();
    }

    async findByUserId(userId) {
        return await Booking.find({ userId }).sort({ createdAt: -1 });
    }

    async findById(bookingId) {
        return await Booking.findById(bookingId);
    }

    async findAll() {
        return await Booking.find().sort({ createdAt: -1 });
    }
}

module.exports = new BookingRepository();