const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    }],
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;