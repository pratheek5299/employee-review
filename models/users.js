const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    permission: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;