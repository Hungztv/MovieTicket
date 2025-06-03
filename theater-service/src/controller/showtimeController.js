const showtimeService = require('../service/showtimeService');

const createShowtime = async (req, res) => {
    try {
        const showtime = await showtimeService.createShowtime(req.body);
        res.status(201).json(showtime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getShowtimeById = async (req, res) => {
    try {
        const showtime = await showtimeService.getShowtimeById(req.params.id);
        res.status(200).json(showtime);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllShowtimes = async (req, res) => {
    try {
        const query = req.query || {};
        const showtimes = await showtimeService.getAllShowtimes(query);
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateShowtime = async (req, res) => {
    try {
        const showtime = await showtimeService.updateShowtime(req.params.id, req.body);
        res.status(200).json(showtime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateShowtimeSeats = async (req, res) => {
    try {
        const { bookedSeats, action } = req.body; // Nhận action từ body
        const showtime = await showtimeService.updateShowtimeSeats(req.params.id, bookedSeats, action);
        res.status(200).json(showtime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteShowtime = async (req, res) => {
    try {
        await showtimeService.deleteShowtime(req.params.id);
        res.status(200).json({ message: 'Showtime deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createShowtime,
    getShowtimeById,
    getAllShowtimes,
    updateShowtime,
    updateShowtimeSeats,
    deleteShowtime,
};