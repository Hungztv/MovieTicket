const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./src/routes/authRoute');

const app = express();

// Middleware
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use('/auth', authRoute);


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost${PORT}/auth`);
  console.log('Auth service is running');
});