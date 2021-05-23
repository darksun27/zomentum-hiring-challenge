const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    serial_number: String,
    name: String,
    purchased_on: Date,
    capacity: String
})

module.exports = mongoose.model("Products", ProductSchema);