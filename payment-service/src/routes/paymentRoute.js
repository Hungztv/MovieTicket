const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

router.post('/initiate', paymentController.initiatePayment);
router.post('/confirm', paymentController.confirmPayment);

module.exports = router;