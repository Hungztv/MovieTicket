const User = require('../model/userModel');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }
}

module.exports = new UserRepository();