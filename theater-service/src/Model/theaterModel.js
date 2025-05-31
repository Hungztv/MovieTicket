const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
}, { collection: 'theaters' });

module.exports = mongoose.model('Theater', theaterSchema);