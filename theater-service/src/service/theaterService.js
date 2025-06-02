const theaterRepository = require('../repository/theaterRepository');

const createTheater = async (theaterData) => {
    const { name, location, capacity } = theaterData;
    if (!name || !location || !capacity) {
        throw new Error('Name, location, and capacity are required');
    }
    return await theaterRepository.createTheater(theaterData);
};

const getTheaterById = async (id) => {
    const theater = await theaterRepository.getTheaterById(id);
    if (!theater) {
        throw new Error('Theater not found');
    }
    return theater;
};

const getAllTheaters = async () => {
    return await theaterRepository.getAllTheaters();
};

const updateTheater = async (id, theaterData) => {
    const theater = await theaterRepository.getTheaterById(id);
    if (!theater) {
        throw new Error('Theater not found');
    }
    return await theaterRepository.updateTheater(id, theaterData);
};

const deleteTheater = async (id) => {
    const theater = await theaterRepository.getTheaterById(id);
    if (!theater) {
        throw new Error('Theater not found');
    }
    return await theaterRepository.deleteTheater(id);
};

module.exports = {
    createTheater,
    getTheaterById,
    getAllTheaters,
    updateTheater,
    deleteTheater,
};