const express = require('express');
const dotenv = require('dotenv');
const paymentRoute = require('./routes/paymentRoute');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});