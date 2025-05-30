const express = require('express');
const mongoose = require('mongoose');
const bookingticketRoute = require('./src/routes/bookingticketRoute');
const authMiddleware = require('./src/middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/booking-ticket', authMiddleware, bookingticketRoute);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});