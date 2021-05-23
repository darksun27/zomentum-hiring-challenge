const mongoose = require('mongoose');

const OnRentSchema = new mongoose.Schema({
    serial_number: String,
    customer_name: String
});

module.exports = mongoose.model("OnRent", OnRentSchema);