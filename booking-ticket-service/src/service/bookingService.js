const Booking = require('../model/bookingModel');
const axios = require('axios');

const createBooking = async (userId, bookingData) => {
    const { showtimeId, seatNumber } = bookingData;

    if (!showtimeId || !seatNumber) {
        throw new Error('Showtime ID and seat number are required');
    }


    const response = await axios.get(`http://localhost:8080/showtime/${showtimeId}`);
    const showtime = response.data;
    if (!showtime) {
        throw new Error(`Showtime ${showtimeId} not found`);
    }

    // Kiểm tra ghế có sẵn
    if (!showtime.availableSeats.includes(seatNumber)) {
        throw new Error(`Seat ${seatNumber} is not available for showtime ${showtimeId}`);
    }

    // Kiểm tra xem ghế đã được đặt trong suất chiếu này chưa
    const existingBooking = await Booking.findOne({
        showtimeId,
        seatNumber,
        status: 'confirmed',
    });

    if (existingBooking) {
        throw new Error(`Seat ${seatNumber} is already booked for showtime ${showtimeId}`);
    }

    // Cập nhật ghế trong theater-service
    await axios.put(`http://localhost:8080/showtime/${showtimeId}/update-seats`, {
        bookedSeats: [seatNumber]
    });

    const booking = new Booking({
        userId,
        showtimeId,
        movieId: showtime.movieId,
        seatNumber,
        bookingDate: new Date(),
        status: 'confirmed',
    });
    await booking.save();
    return booking;
};

const cancelBooking = async (bookingId, userId) => {
    console.log('Canceling booking with ID:', bookingId, 'for user:', userId);
    if (!bookingId || !userId) {
        throw new Error('Booking ID and user ID are required');
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }

    if (booking.userId.toString() !== userId.toString()) {
        throw new Error('You do not have permission to cancel this booking');
    }

    if (booking.status === 'cancelled') {
        throw new Error('Booking already cancelled');
    }

    // Gọi API để cập nhật showtime trước
    console.log('Updating showtime:', booking.showtimeId, 'seat:', booking.seatNumber);
    try {
        const showtimeResponse = await axios.put(`http://localhost:8080/showtime/${booking.showtimeId}/update-seats`, {
            bookedSeats: [booking.seatNumber],
            action: 'remove'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Showtime updated:', showtimeResponse.data);
    } catch (showtimeError) {
        console.error('Showtime update failed:', showtimeError.response?.data || showtimeError.message);
        throw new Error(`Failed to update showtime: ${showtimeError.response?.data?.message || showtimeError.message}`);
    }

    // Cập nhật booking sau khi showtime thành công
    booking.status = 'cancelled';
    await booking.save();
    console.log('Booking cancelled successfully for ID:', bookingId);

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