const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: false
    },
    lastName:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

User.createUser = async (newUser) => {
    try {
        const user = new User(
            {
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            password: await User.generatePassword(newUser.password)
        })
        const response = await user.save();
        return response;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

User.verifyPassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}

User.generatePassword = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

module.exports = User;
