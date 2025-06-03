const axios = require('axios');

class PaymentService {
    async initiatePayment(bookingId) {
        try {
            // Gọi API booking service qua gateway
            const bookingResponse = await axios.get(`${process.env.GATEWAY_URL}/${bookingId}`);
            const booking = bookingResponse.data;
            if (!booking || booking.status !== 'pending') {
                throw new Error('Booking not found or not in pending state');
            }

            // Giả lập thời gian giữ vé 1 phút
            setTimeout(async () => {
                try {
                    const updatedBookingResponse = await axios.get(`${process.env.GATEWAY_URL}/${bookingId}`);
                    const updatedBooking = updatedBookingResponse.data;

                    if (updatedBooking.status === 'pending') {
                        console.log(`Booking ${bookingId} expired, cancelling...`);
                        await axios.put(`${process.env.GATEWAY_URL}/cancel/${bookingId}`, {});
                        console.log(`Booking ${bookingId} cancelled and seat returned`);
                    }
                } catch (error) {
                    console.error(`Error cancelling booking ${bookingId}:`, error.message);
                }
            }, 60 * 1000); // 1 phút

            return { message: 'Payment initiated, you have 1 minute to complete payment', bookingId };
        } catch (error) {
            throw new Error(`Failed to initiate payment: ${error.message}`);
        }
    }

    async confirmPayment(bookingId) {
        try {
            const bookingResponse = await axios.get(`${process.env.GATEWAY_URL}/${bookingId}`);
            const booking = bookingResponse.data;
            if (!booking || booking.status !== 'pending') {
                throw new Error('Booking not found or not in pending state');
            }

            const confirmResponse = await axios.put(`${process.env.GATEWAY_URL}/confirm/${bookingId}`, {});
            return confirmResponse.data;
        } catch (error) {
            throw new Error(`Failed to confirm payment: ${error.message}`);
        }
    }
}

module.exports = new PaymentService();