const express = require('express');
const router = express.Router();
const theaterController = require('../Controller/theaterController');

router.post('/create', theaterController.createTheater);
router.get('/all', theaterController.getAllTheaters);

module.exports = router;