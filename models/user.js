const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({    // Create a schema for user
    name: {     // name: String, required
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {    // email: String, required, unique
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    username: { // username: String, required, unique
        type: String,
        required: [true, "Please enter your username"],
        unique: true
    },
    password: { // password: String, required
        type: String,
        required: [true, "Please enter your password"]
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;