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

    // 1. Hủy booking
    booking.status = 'cancelled';
    await booking.save();

    // 2. Lấy showtime
    const showtime = await Showtime.findById(booking.showtimeId);
    if (!showtime) {
        throw new Error('Showtime not found');
    }

    // 3. Trả lại seat vào availableSeats (nếu chưa có)
    if (!showtime.availableSeats.includes(booking.seatNumber)) {
        showtime.availableSeats.push(booking.seatNumber);
    }

    // 4. Xóa khỏi bookedSeats nếu đang có
    if (Array.isArray(showtime.bookedSeats)) {
        showtime.bookedSeats = showtime.bookedSeats.filter(seat => seat !== booking.seatNumber);
    }

    // 5. Lưu lại showtime
    await showtime.save();

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