const Showtime = require('../model/showtimeModel');

const createShowtime = async (showtimeData) => {
    const showtime = new Showtime(showtimeData);
    return await showtime.save();
};

const getShowtimeById = async (id) => {
    return await Showtime.findById(id);
};

const getAllShowtimes = async (query) => {
    return await Showtime.find(query);
};

const updateShowtime = async (id, showtimeData) => {
    return await Showtime.findByIdAndUpdate(id, showtimeData, { new: true });
};

const deleteShowtime = async (id) => {
    return await Showtime.findByIdAndDelete(id);
};

module.exports = {
    createShowtime,
    getShowtimeById,
    getAllShowtimes,
    updateShowtime,
    deleteShowtime,
};