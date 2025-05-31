const showtimeService = require('../Service/showtimeService');

class ShowtimeController {
    async createShowtime(req, res) {
        try {
            const showtime = await showtimeService.createShowtime(req.body);
            res.status(201).json({ message: 'Showtime created successfully', showtime });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getShowtimesByMovieId(req, res) {
        try {
            const movieId = req.query.movieId;
            const showtimes = await showtimeService.getShowtimesByMovieId(movieId);
            res.status(200).json(showtimes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateAvailableSeats(req, res) {
        try {
            const showtimeId = req.params.id;
            const { bookedSeats } = req.body;
            const showtime = await showtimeService.updateAvailableSeats(showtimeId, bookedSeats);
            res.status(200).json({ message: 'Seats updated successfully', showtime });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ShowtimeController();