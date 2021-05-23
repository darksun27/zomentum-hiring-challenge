const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    serial_number: String,
    name: String,
    customer: String,
    rent_on: Date,
    rent_due: Date,
    rent_pm: Number,
    agreement: String,
});

module.exports = mongoose.model("Order", OrderSchema);