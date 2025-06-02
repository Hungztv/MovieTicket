const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const theaterRoute = require('./src/routes/theaterRoute');
const showtimeRoute = require('./src/routes/showtimeRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/theater', theaterRoute);
app.use('/showtime', showtimeRoute);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Theater service listening on port http://localhost:${PORT}`);
});