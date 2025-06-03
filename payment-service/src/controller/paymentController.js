const paymentService = require('../service/paymentService');

class PaymentController {
    async initiatePayment(req, res) {
        try {
            const { bookingId } = req.body;
            const result = await paymentService.initiatePayment(bookingId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async confirmPayment(req, res) {
        try {
            const { bookingId } = req.body;
            const result = await paymentService.confirmPayment(bookingId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PaymentController();