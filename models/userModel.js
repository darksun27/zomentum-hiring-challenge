const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    phone_number: Number
});

module.exports = mongoose.model("User", UserSchema);