const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movieId: {
        type: String,
        required: true,
        trim: true,
    },
    seatNumber: {
        type: String,
        required: true,
        trim: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'bookings' });

module.exports = mongoose.model('Booking', bookingSchema);