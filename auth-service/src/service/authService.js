const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository');

require('dotenv').config()

class AuthService {
    async register(userData) {
        try {
            const { username, email, password } = userData;

            // Kiểm tra email hoặc username đã tồn tại
            const existingEmail = await userRepository.findByEmail(email);
            if (existingEmail) throw new Error('Email already exists');

            const existingUsername = await userRepository.findByUsername(username);
            if (existingUsername) throw new Error('Username already exists');

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo user mới
            const newUser = await userRepository.create({
                username,
                email,
                password: hashedPassword,
            });

            return newUser;
        } catch (error) {
            throw error; // Ném lỗi để controller xử lý
        }
    }

    async login(email, password) {
        try {
            // Tìm user theo email
            const user = await userRepository.findByEmail(email);
            if (!user) throw new Error('User not found');

            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid password');

            // Tạo JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { token, user };
        } catch (error) {
            throw error; // Ném lỗi để controller xử lý
        }
    }
}

module.exports = new AuthService();