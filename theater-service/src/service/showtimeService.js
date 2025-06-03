const showtimeRepository = require('../repository/showtimeRepository');
const theaterService = require('./theaterService');

const createShowtime = async (showtimeData) => {
    const { movieId, theaterId, startTime } = showtimeData;
    if (!movieId || !theaterId || !startTime) {
        throw new Error('Movie ID, theater ID, and start time are required');
    }

    const theater = await theaterService.getTheaterById(theaterId);
    if (!theater) {
        throw new Error('Theater not found');
    }

    // Lấy danh sách ghế từ rạp làm availableSeats mặc định
    const availableSeats = theater.seats;
    const bookedSeats = [];

    return await showtimeRepository.createShowtime({
        movieId,
        theaterId,
        startTime,
        availableSeats,
        bookedSeats,
    });
};
const getShowtimeById = async (id) => {
    const showtime = await showtimeRepository.getShowtimeById(id);
    if (!showtime) {
        throw new Error('Showtime not found');
    }
    return showtime;
};

const getAllShowtimes = async (query) => {
    return await showtimeRepository.getAllShowtimes(query);
};

const updateShowtime = async (id, showtimeData) => {
    const showtime = await showtimeRepository.getShowtimeById(id);
    if (!showtime) {
        throw new Error('Showtime not found');
    }
    return await showtimeRepository.updateShowtime(id, showtimeData);
};

const updateShowtimeSeats = async (id, bookedSeats, action = 'add') => {
    const showtime = await showtimeRepository.getShowtimeById(id);
    if (!showtime) {
        throw new Error('Showtime not found');
    }

    let updatedAvailableSeats = [...showtime.availableSeats];
    let updatedBookedSeats = [...showtime.bookedSeats];

    if (action === 'add') {
        // Thêm ghế vào bookedSeats và xóa khỏi availableSeats
        updatedAvailableSeats = showtime.availableSeats.filter(seat => !bookedSeats.includes(seat));
        updatedBookedSeats = [...new Set([...showtime.bookedSeats, ...bookedSeats])];
    } else if (action === 'remove') {
        // Xóa ghế khỏi bookedSeats và thêm lại vào availableSeats
        updatedBookedSeats = showtime.bookedSeats.filter(seat => !bookedSeats.includes(seat));
        updatedAvailableSeats = [...new Set([...showtime.availableSeats, ...bookedSeats])];
    } else {
        throw new Error('Invalid action specified');
    }

    return await showtimeRepository.updateShowtime(id, {
        availableSeats: updatedAvailableSeats,
        bookedSeats: updatedBookedSeats,
    });
};

const deleteShowtime = async (id) => {
    const showtime = await showtimeRepository.getShowtimeById(id);
    if (!showtime) {
        throw new Error('Showtime not found');
    }
    return await showtimeRepository.deleteShowtime(id);
};
const returnSeatToAvailable = async (id, seatNumber) => {
    const showtime = await showtimeRepository.getShowtimeById(id);
    if (!showtime) {
        throw new Error('Showtime not found');
    }
    const updatedBookedSeats = showtime.bookedSeats.filter(seat => seat !== seatNumber);
    const updatedAvailableSeats = [...new Set([...showtime.availableSeats, seatNumber])];
    return await showtimeRepository.updateShowtime(id, {
        availableSeats: updatedAvailableSeats,
        bookedSeats: updatedBookedSeats,
    });
};
module.exports = {
    createShowtime,
    getShowtimeById,
    getAllShowtimes,
    updateShowtime,
    updateShowtimeSeats,
    deleteShowtime,
    returnSeatToAvailable,
};