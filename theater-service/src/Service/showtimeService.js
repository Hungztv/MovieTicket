const Showtime = require('../Model/showtimeModel');

const createShowtime = async (showtimeData) => {
    const { theaterId, movieId, startTime, availableSeats } = showtimeData;
    if (!theaterId || !movieId || !startTime || !availableSeats || !Array.isArray(availableSeats)) {
        throw new Error('Theater ID, movie ID, start time, and available seats are required');
    }
    const showtime = new Showtime({
        theaterId,
        movieId,
        startTime,
        availableSeats,
    });
    await showtime.save();
    return showtime;
};

const getShowtimesByMovieId = async (movieId) => {
    return await Showtime.find({ movieId });
};

const updateAvailableSeats = async (showtimeId, bookedSeats) => {
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) throw new Error('Showtime not found');
    const newAvailableSeats = showtime.availableSeats.filter(seat => !bookedSeats.includes(seat));
    if (newAvailableSeats.length === showtime.availableSeats.length) {
        throw new Error('Some seats are not available');
    }
    showtime.availableSeats = newAvailableSeats;
    await showtime.save();
    return showtime;
};

module.exports = { createShowtime, getShowtimesByMovieId, updateAvailableSeats };