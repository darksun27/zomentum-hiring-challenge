const expect = require('chai').expect;
const mongoose = require("mongoose");
const request = require('supertest');
const server = require('../index');

const Ticket = require('../models/ticketsModel');

describe('Ticket API', ()=> {
    it('should get all the tickets of a particular time', (done) => {
        request(server)
            .get('/viewTickets?time=00:30')
            .then((res) => {
                expect(res.body).to.contain.property('tickets');
                done();
            })
    })

    it('should book ticket and receive a ticket id', (done) => {
        request(server)
            .post('/bookTicket')
            .type('form')
            .send({
                username: 'darksun27',
                phone_number: 9810866770,
                time: '00:30'
            })
            .then((res) => {
                expect(res.body).to.contain.property('ticketID');
                done();
            });
    });

    it('should return user details from ticket id', (done) => {
        let user = {
            username: 'darksun27',
            phone_number: 9810866770,
            time: '00:30'
        }
        let ticketID = null;
        request(server)
            .post('/bookTicket')
            .type('form')
            .send(user)
            .then((res) => {
                expect(res.body).to.contain.property('ticketID');
                ticketID = res.body.ticketID;
                request(server)
                .get(`/ticketDetails/${ticketID}`)
                .then((res) => {
                    expect(res.body).to.contain.property('username');
                    expect(res.body).to.contain.property('phone_number');
                    expect(res.body.username).to.equal(user.username);
                    expect(res.body.phone_number).to.equal(user.phone_number);
                    done();
                })
            });
    });

    it('should correctly update ticket timing', (done) => {
        let user = {
            username: 'darksun27',
            phone_number: 9810866770,
            time: '00:30'
        }
        let ticketID = null;
        request(server)
            .post('/bookTicket')
            .type('form')
            .send(user)
            .then((res) => {
                expect(res.body).to.contain.property('ticketID');
                ticketID = res.body.ticketID;
                request(server)
                    .put('/updateTime')
                    .type('form')
                    .send({
                        id: ticketID,
                        time: '00:40'
                    })
                    .then((res) => {
                        expect(res.body).to.have.property('success');
                    })
                    done();
                });
    });

    it('should correctly delete a ticket', (done) => {
        let user = {
            username: 'darksun27',
            phone_number: 9810866770,
            time: '00:30'
        }
        let ticketID = null;
        request(server)
            .post('/bookTicket')
            .type('form')
            .send(user)
            .then((res) => {
                expect(res.body).to.contain.property('ticketID');
                ticketID = res.body.ticketID;
                request(server)
                    .delete(`/deleteTicket?id=${ticketID}`)
                    .then((res) => {
                        expect(res.body).to.have.property('success');
                    })
                    done();
                });
    });
});