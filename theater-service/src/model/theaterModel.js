const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    seats: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Theater', theaterSchema);