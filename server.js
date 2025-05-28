const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Thêm cors
const app = express();

// Enable CORS for all origins (or specify 'http://192.168.1.214:8080')
app.use(cors());
app.use(express.json());

// Kết nối MongoDB (thay bằng connection string của bạn)
mongoose.connect('mongodb://localhost:27017/MovieTicket', 
 )
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi MongoDB:', err));

// Định nghĩa schema
const movieSchema = new mongoose.Schema({
  title: String,
  time: String,
  cinema: String,
});
const seatSchema = new mongoose.Schema({
  showtimeId: Number,
  seatNumber: String,
  booked: Boolean,
  lockedUntil: { type: Date, default: null },
});
const ticketSchema = new mongoose.Schema({
  showtimeId: Number,
  seatId: String,
  createdAt: { type: Date, default: Date.now },
});
const Movie = mongoose.model('Movie', movieSchema);
const Seat = mongoose.model('Seat', seatSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

// Thêm dữ liệu mẫu
async function initData() {
  const movieCount = await Movie.countDocuments();
  if (movieCount === 0) {
    await Movie.insertMany([
      { title: 'Avengers', time: '19:00', cinema: 'Cinema 1' },
      { title: 'Spider-Man', time: '21:00', cinema: 'Cinema 2' },
    ]);
    await Seat.insertMany([
      { showtimeId: 1, seatNumber: 'A1', booked: false },
      { showtimeId: 1, seatNumber: 'A2', booked: false },
      { showtimeId: 1, seatNumber: 'A3', booked: false },
      { showtimeId: 1, seatNumber: 'A4', booked: false },
      { showtimeId: 2, seatNumber: 'B1', booked: false },
      { showtimeId: 2, seatNumber: 'B2', booked: false },
      { showtimeId: 2, seatNumber: 'B3', booked: false },
      { showtimeId: 2, seatNumber: 'B4', booked: false },
    ]);
    console.log('Dữ liệu mẫu đã được thêm');
  }
}
initData();

// API lấy danh sách phim
app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// API lấy trạng thái ghế
app.get('/seats/:showtimeId', async (req, res) => {
  const seats = await Seat.find({ showtimeId: parseInt(req.params.showtimeId) });
  res.json(seats);
});

// API đặt vé
app.post('/book', async (req, res) => {
  const { showtimeId, seatId } = req.body;
  try {
    const seat = await Seat.findOne({ _id: seatId, showtimeId });
    if (!seat) return res.status(404).json({ message: 'Ghế không tồn tại' });
    if (seat.booked) return res.status(400).json({ message: 'Ghế đã được đặt!' });
    if (seat.lockedUntil && seat.lockedUntil > new Date()) {
      return res.status(400).json({ message: 'Ghế đang được khóa!' });
    }

    // Khóa ghế 5 phút
    seat.lockedUntil = new Date(Date.now() + 5 * 60 * 1000);
    await seat.save();

    // Xác nhận đặt vé
    seat.booked = true;
    seat.lockedUntil = null;
    await seat.save();

    const ticket = new Ticket({ showtimeId, seatId });
    await ticket.save();

    res.json({ message: 'Đặt vé thành công!', ticket });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// API lấy danh sách vé
app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

// API giả lập rạp 1
app.get('/cinema1/seats', async (req, res) => {
  const seats = await Seat.find({ showtimeId: 1 });
  res.json(seats);
});

// API giả lập rạp 2
app.get('/cinema2/seats', async (req, res) => {
  const seats = await Seat.find({ showtimeId: 2 });
  res.json(seats);
});

// Khởi động server
app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));