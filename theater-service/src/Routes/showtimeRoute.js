const express = require('express');
const router = express.Router();
const showtimeController = require('../Controller/showtimeController');

router.post('/create', showtimeController.createShowtime);
router.get('/', showtimeController.getShowtimesByMovieId);
router.put('/:id/update-seats', showtimeController.updateAvailableSeats);

module.exports = router;