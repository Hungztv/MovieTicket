const Theater = require('../Model/theaterModel');

const createTheater = async (theaterData) => {
    const { name, address } = theaterData;
    if (!name || !address) {
        throw new Error('Name and address are required');
    }
    const theater = new Theater({ name, address });
    await theater.save();
    return theater;
};

const getAllTheaters = async () => {
    return await Theater.find();
};

module.exports = { createTheater, getAllTheaters };