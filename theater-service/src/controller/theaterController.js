const theaterService = require('../service/theaterService');

const createTheater = async (req, res) => {
    try {
        const theater = await theaterService.createTheater(req.body);
        res.status(201).json(theater);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTheaterById = async (req, res) => {
    try {
        const theater = await theaterService.getTheaterById(req.params.id);
        res.status(200).json(theater);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllTheaters = async (req, res) => {
    try {
        const theaters = await theaterService.getAllTheaters();
        res.status(200).json(theaters);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTheater = async (req, res) => {
    try {
        const theater = await theaterService.updateTheater(req.params.id, req.body);
        res.status(200).json(theater);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTheater = async (req, res) => {
    try {
        await theaterService.deleteTheater(req.params.id);
        res.status(200).json({ message: 'Theater deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTheater,
    getTheaterById,
    getAllTheaters,
    updateTheater,
    deleteTheater,
};