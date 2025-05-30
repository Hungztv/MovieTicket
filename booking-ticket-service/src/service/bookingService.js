const Booking = require('../model/bookingModel');

const createBooking = async (userId, bookingData) => {
    const { movieId, seatNumber } = bookingData;

    // Kiểm tra dữ liệu đầu vào
    if (!movieId || !seatNumber) {
        throw new Error('Movie ID and seat number are required');
    }

    // Kiểm tra xem ghế đã được đặt trong suất chiếu này chưa
    const existingBooking = await Booking.findOne({
        movieId,
        seatNumber,
        status: 'confirmed', // Chỉ kiểm tra các booking còn hiệu lực
    });

    if (existingBooking) {
        throw new Error(`Seat ${seatNumber} is already booked for movie ${movieId}`);
    }

    // Nếu không có trùng lặp, tạo booking mới
    const booking = new Booking({
        userId,
        movieId,
        seatNumber,
        bookingDate: new Date(),
        status: 'confirmed', // Thêm trạng thái để dễ quản lý
    });
    await booking.save();
    return booking;
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ userId, status: 'confirmed' });
};

const getAllBookings = async () => {
    return await Booking.find({ status: 'confirmed' });
};

module.exports = {
    createBooking,
    getBookingsByUserId,
    getAllBookings,
};