const theaterRepository = require('../repository/theaterRepository');

// Hàm tạo danh sách ghế dựa trên capacity
const generateSeats = (capacity) => {
    const seats = [];
    const rows = Math.ceil(capacity / 10); // Mỗi hàng 10 ghế
    const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Hàng từ A-Z

    for (let i = 0; i < rows; i++) {
        const rowLetter = rowLetters[i];
        const seatsInRow = Math.min(10, capacity - i * 10); // Số ghế trong hàng này
        for (let j = 1; j <= seatsInRow; j++) {
            seats.push(`${rowLetter}${j}`);
        }
    }
    return seats;
};

const createTheater = async (theaterData) => {
    const { name, location, capacity } = theaterData;
    if (!name || !location || !capacity) {
        throw new Error('Name, location, and capacity are required');
    }

    // Tạo danh sách ghế dựa trên capacity
    const seats = generateSeats(capacity);

    return await theaterRepository.createTheater({
        name,
        location,
        capacity,
        seats, // Lưu danh sách ghế
    });
};

// Thêm hàm getTheaterById
const getTheaterById = async (theaterId) => {
    if (!theaterId) {
        throw new Error('Theater ID is required');
    }
    const theater = await theaterRepository.getTheaterById(theaterId);
    if (!theater) {
        throw new Error('Theater not found');
    }
    return theater;
};

const getAllTheaters = async () => {
    return await theaterRepository.getAllTheaters();
};

const updateTheater = async (theaterId, updateData) => {
    if (!theaterId) {
        throw new Error('Theater ID is required');
    }
    const theater = await theaterRepository.getTheaterById(theaterId);
    if (!theater) {
        throw new Error('Theater not found');
    }
    return await theaterRepository.updateTheater(theaterId, updateData);
};

const deleteTheater = async (theaterId) => {
    if (!theaterId) {
        throw new Error('Theater ID is required');
    }
    const theater = await theaterRepository.getTheaterById(theaterId);
    if (!theater) {
        throw new Error('Theater not found');
    }
    return await theaterRepository.deleteTheater(theaterId);
};

module.exports = {
    createTheater,
    getTheaterById, // Export hàm getTheaterById
    getAllTheaters,
    updateTheater,
    deleteTheater,
};