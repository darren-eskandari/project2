const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profilePic: String,
    firstName: String,
    lastName: String,
    dob: String,
    location: String,
    admin: Boolean,
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    }],
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;