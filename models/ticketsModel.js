const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticket_timing: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", TicketSchema);