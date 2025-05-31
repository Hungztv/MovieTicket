const theaterService = require('../Service/theaterService');

class TheaterController {
    async createTheater(req, res) {
        try {
            const theater = await theaterService.createTheater(req.body);
            res.status(201).json({ message: 'Theater created successfully', theater });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllTheaters(req, res) {
        try {
            const theaters = await theaterService.getAllTheaters();
            res.status(200).json(theaters);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new TheaterController();