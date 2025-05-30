const Booking = require('../model/bookingModel');

const createBooking = async (userId, bookingData) => {
    const { movieId, seatNumber } = bookingData;

    if (!movieId || !seatNumber) {
        throw new Error('Movie ID and seat number are required');
    }

    // Kiểm tra xem ghế đã được đặt trong suất chiếu này chưa
    const existingBooking = await Booking.findOne({
        movieId,
        seatNumber,
        status: 'confirmed',
    });

    if (existingBooking) {
        throw new Error(`Seat ${seatNumber} is already booked for movie ${movieId}`);
    }

    const booking = new Booking({
        userId,
        movieId,
        seatNumber,
        bookingDate: new Date(),
        status: 'confirmed',
    });
    await booking.save();
    return booking;
};

const cancelBooking = async (bookingId, userId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }
    if (booking.userId.toString() !== userId.toString()) {
        throw new Error('You can only cancel your own bookings');
    }
    if (booking.status === 'cancelled') {
        throw new Error('Booking is already cancelled');
    }
    booking.status = 'cancelled';
    await booking.save();
    return { message: 'Booking cancelled successfully' };
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ userId, status: 'confirmed' });
};

const getAllBookings = async () => {
    return await Booking.find({ status: 'confirmed' });
};

module.exports = {
    createBooking,
    cancelBooking,
    getBookingsByUserId,
    getAllBookings,
};