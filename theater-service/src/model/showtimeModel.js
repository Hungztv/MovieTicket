const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    startTime: { type: Date, required: true },
    availableSeats: [{ type: String }],
    bookedSeats: [{ type: String }],
}, { timestamps: true });

const Showtime = mongoose.model('Showtime', showtimeSchema);
module.exports = Showtime;