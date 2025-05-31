require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoute = require('./src/routes/authRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Kết nối MongoDB
connectDB();

// Routes
app.use('/auth', authRoute);


// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/auth`);
  console.log('Auth service is running');
});