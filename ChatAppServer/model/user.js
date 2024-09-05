const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pnumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    isOTPverified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    }
})

const Users = mongoose.model('User', userSchema);
module.exports = Users;