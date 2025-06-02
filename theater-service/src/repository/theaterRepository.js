const Theater = require('../model/theaterModel');

const createTheater = async (theaterData) => {
    const theater = new Theater(theaterData);
    return await theater.save();
};

const getTheaterById = async (id) => {
    return await Theater.findById(id);
};

const getAllTheaters = async () => {
    return await Theater.find();
};

const updateTheater = async (id, theaterData) => {
    return await Theater.findByIdAndUpdate(id, theaterData, { new: true });
};

const deleteTheater = async (id) => {
    return await Theater.findByIdAndDelete(id);
};

module.exports = {
    createTheater,
    getTheaterById,
    getAllTheaters,
    updateTheater,
    deleteTheater,
};