const express = require('express');
const router = express.Router();
const theaterController = require('../controller/theaterController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, theaterController.createTheater);
router.get('/:id', theaterController.getTheaterById);
router.get('/', theaterController.getAllTheaters);
router.put('/:id', authMiddleware, adminMiddleware, theaterController.updateTheater);
router.delete('/:id', authMiddleware, adminMiddleware, theaterController.deleteTheater);

module.exports = router;