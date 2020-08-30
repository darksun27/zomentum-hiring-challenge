const chalk = require('chalk');
const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket');
const User = mongoose.model('User');

module.exports = (app) => {
    app.get('/test', (req, res) => {
        res.json({ data: "Hello World" });
    })
}