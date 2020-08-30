const chalk = require('chalk');
const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket');

module.exports = (app) => {
    app.get('/ticketDetails/:id', async (req, res) => {
        await Ticket.findById( req.params.id, (err, ticket) => {
            if(err) {
                res.json({ error: "Invalid Ticket ID!" });
            } else {
                let userData = {
                    username: ticket.username,
                    phone_number: ticket.phone_number
                };
                res.json(userData);
            }
        });
    });

    app.get('/viewTickets', async (req, res) => {
        let hour = req.query.time.split(':')[0];
        let minutes = req.query.time.split(':')[1]
        let curDate = new Date();
        let ticketTime = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), hour, minutes, 0, 0);
        await Ticket.find({ ticket_timing: ticketTime }, (err, tickets) => {
            if(err) {
                res.json({ error: "Invalid Time!" });
            } else {
                res.json({ tickets: tickets });
            }
        });
    });

    app.post('/bookTicket', async (req, res)=> {
        let hour = req.body.time.split(':')[0];
        let minutes = req.body.time.split(':')[1]
        let curDate = new Date();
        let ticketTime = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), hour, minutes, 0, 0);
        await Ticket.find({ ticket_timing: ticketTime}, async (err, tickets) => {
            if(err) {
                res.json({ error: "Invalid Time!" });
            } else {
                if(tickets.length >= 20) {
                    res.json({ error: "Tickets are full for this show! Kindly choose another time!" });
                } else {
                    let ticketDetails = {
                        username: req.body.username,
                        phone_number: req.body.phone_number,
                        ticket_timing: ticketTime
                    };
                    await Ticket.create(ticketDetails, (err, ticket) => {
                        if(err) {
                            res.json({ error: "Could not create a ticket at the moment! Please try again later." });
                        } else {
                            res.json({ ticketID: ticket._id });
                        }
                    });
                }
            }
        });
    });

    app.put("/updateTime", async (req, res) => {
        let hour = req.body.time.split(':')[0];
        let minutes = req.body.time.split(':')[1]
        let curDate = new Date();
        let ticketTime = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), hour, minutes, 0, 0);
        await Ticket.find({ ticket_timing: ticketTime}, async (err, tickets) => {
            if(err) {
                res.json({ error: "Invalid Time!" });
            } else {
                if(tickets.length >= 20) {
                    res.json({ error: "Tickets are full for this show! Kindly choose another time!" });
                } else {
                    await Ticket.findByIdAndUpdate(req.body.id, { ticket_timing : ticketTime }, { new: true }, (err, ticket) => {
                        if(err) {
                            res.json({ error: "Error updating Time!" })
                        } else {
                            res.json({ success: "Successfully updated ticket time!" });
                        }
                    });
                }
            }
        });
    });

    app.delete('/deleteTicket', async (req, res) => {
        await Ticket.findByIdAndDelete(req.query.id, (err) => {
            if(err) {
                res.json({ error: "Error Deleting the Ticket!" });
            } else {
                res.json({ success: "Ticket Deletion Successful" });
            }
        });
    });
}