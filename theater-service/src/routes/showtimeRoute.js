const express = require('express');
const router = express.Router();
const showtimeController = require('../controller/showtimeController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, showtimeController.createShowtime);
router.get('/:id', showtimeController.getShowtimeById);
router.get('/', showtimeController.getAllShowtimes);
router.put('/:id', authMiddleware, adminMiddleware, showtimeController.updateShowtime);
router.put('/:id/update-seats', showtimeController.updateShowtimeSeats);
router.delete('/:id', authMiddleware, adminMiddleware, showtimeController.deleteShowtime);

module.exports = router;