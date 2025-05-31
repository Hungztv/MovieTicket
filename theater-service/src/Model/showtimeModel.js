const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    movieId: { type: String, required: true },
    startTime: { type: Date, required: true },
    availableSeats: { type: [String], required: true }, // Danh sách ghế còn trống
}, { collection: 'showtimes' });

module.exports = mongoose.model('Showtime', showtimeSchema);