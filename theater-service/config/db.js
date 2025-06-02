const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/TheaterService',);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
};

module.exports = connectDB;