const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Kết nối MongoDB ()
mongoose.connect('mongodb://localhost:27017/MovieTicket')
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi MongoDB:', err));

// Schema & Model
const movieSchema = new mongoose.Schema({
  title: String,
  time: String,
  cinema: String,
});
const seatSchema = new mongoose.Schema({
  showtimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  seatNumber: String,
  booked: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);
const Seat = mongoose.model('Seat', seatSchema);

// Thêm dữ liệu mẫu
async function initData() {
  const movieCount = await Movie.countDocuments();
  if (movieCount === 0) {
    const movies = await Movie.insertMany([
      { title: 'Avengers', time: '19:00', cinema: 'Cinema 1' },
      { title: 'Spider-Man', time: '21:00', cinema: 'Cinema 2' },
    ]);

    await Seat.insertMany([
      { showtimeId: movies[0]._id, seatNumber: 'A1', booked: false },
      { showtimeId: movies[0]._id, seatNumber: 'A2', booked: false },
      { showtimeId: movies[0]._id, seatNumber: 'A3', booked: false },
      { showtimeId: movies[0]._id, seatNumber: 'A4', booked: false },
      { showtimeId: movies[1]._id, seatNumber: 'B1', booked: false },
      { showtimeId: movies[1]._id, seatNumber: 'B2', booked: false },
      { showtimeId: movies[1]._id, seatNumber: 'B3', booked: false },
      { showtimeId: movies[1]._id, seatNumber: 'B4', booked: false },
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

// API lấy danh sách ghế theo phim
app.get('/seats/:showtimeId', async (req, res) => {
  const { showtimeId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(showtimeId)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  const seats = await Seat.find({ showtimeId });
  res.json(seats);
});

// API đặt vé
app.post('/book', async (req, res) => {
  const { showtimeId, seatId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(seatId) || !mongoose.Types.ObjectId.isValid(showtimeId)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  const seat = await Seat.findOne({ _id: seatId, showtimeId });
  if (!seat) return res.status(404).json({ message: 'Ghế không tồn tại' });
  if (seat.booked) return res.status(400).json({ message: 'Ghế đã được đặt!' });

  seat.booked = true;
  await seat.save();
  res.json({ message: 'Đặt vé thành công!' });
});

// Khởi động server
app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));
