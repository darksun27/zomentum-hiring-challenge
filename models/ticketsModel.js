const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticket_timing: { type: Date, expires: 8*3600},
    username: String,
    phone_number: Number,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", TicketSchema);