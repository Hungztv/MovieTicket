const Booking = require('../model/bookingModel');

const createBooking = async (userId, bookingData) => {
    const { movieId, seatNumber } = bookingData;
    const booking = new Booking({
        userId,
        movieId,
        seatNumber,
        bookingDate: new Date(),
    });
    await booking.save();
    return booking;
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ userId });
};

const getAllBookings = async () => {
    return await Booking.find();
};

module.exports = {
    createBooking,
    getBookingsByUserId,
    getAllBookings,
};