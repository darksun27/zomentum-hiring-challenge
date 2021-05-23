const chalk = require('chalk');
const mongoose = require('mongoose');

const Product = mongoose.model('Products');
const Order = mongoose.model('Order');

module.exports = (app) => {
    app.get('/getProducts', async (req, res) => {
        let allProducts = new Set();
        let ongoingOrders = new Set();
        let productInfo;
        await Product.find( {}, (err, products) => {
            if(err) {
                res.json({ error: "Error Fetching Products" });
            } else {
                productInfo = products;
                products.forEach((product) => {
                    allProducts.add(product.serial_number);
                })
            }
        });
        await Order.find({}, (err, orders) => {
            if(err) {
                res.json({ error: "Error Fetching Orders!" });
            } else {
                orders.forEach(order => {
                    if(order.rent_due > new Date()) {
                        ongoingOrders.add(order.serial_number);
                    }
                })
            }
        });
        let onRent = new Set()
        for (let elem of ongoingOrders) {
            if (allProducts.has(elem)) {
                onRent.add(elem)
            }
        }
        let inStock = new Set(allProducts)
        for (let elem of ongoingOrders) {
            inStock.delete(elem)
        }
        res.json({ products: productInfo, onRent: Array.from(onRent), inStock: Array.from(inStock) });
    });

    app.get('/viewAllOrders', async (req, res) => {
        await Order.find({}, (err, orders) => {
            if(err) {
                res.json({ error: "Error Fetching Orders!" });
            } else {
                let ongoingOrders = [];
                let pastOrders = [];
                orders.forEach(order => {
                    if(order.rent_due > new Date()) {
                        ongoingOrders.push(order);
                    } else {
                        pastOrders.push(order);
                    }
                })
                res.json({ ongoingOrders: ongoingOrders, pastOrders: pastOrders });
            }
        });
    });

    app.get('/viewMachineOrder/:id', async (req, res) => {
        let machineID = req.params.id;
        await Order.find({serial_number: machineID}, (err, orders) => {
            if(err) {
                res.json({ error: "Error Fetching Orders!" });
            } else {
                let revenue = 0;
                let isOnRent = false;
                let rentCustomer = "Stock";
                let monthsUsed = 0;
                orders.forEach((order) => {
                    if(order.rent_due > new Date()) {
                        isOnRent = true;
                        rentCustomer = order.customer;
                    }
                    var diff =(order.rent_due.getTime() - order.rent_on.getTime()) / 1000;
                    diff /= (60 * 60 * 24 * 7 * 4);
                    let thismachine = Math.abs(Math.round(diff));
                    monthsUsed += thismachine
                    revenue += thismachine * order.rent_pm;
                })
                res.json({ orders: orders, isOnRent: isOnRent ? "Yes":"No", rented_to: rentCustomer, monthsUsed: monthsUsed, revenue: revenue });
            }
        });
    });

    app.get('/getMachines', async (req, res) => {
        await Product.find( {}, ['serial_number'], (err, products) => {
            if(err) {
                res.json({ error: "Error Fetching Products" });
            } else {
                res.json(products);
            }
        });
    })

    app.post('/saveProduct', async (req, res)=> {
        let name = req.body.name;
        let serial_number = req.body.serial_number;
        let purchased_on = req.body.purchased_on;
        let capacity = req.body.capacity;
        let productDetails = {
            serial_number: serial_number,
            name: name,
            purchased_on: purchased_on,
            capacity: capacity
        }
        await Product.create(productDetails, (err, product) => {
            if(err) {
                res.json({ error: "Could save the product at the moment." });
            } else {
                res.json({ product: product });
            }
        });
    });

    app.post('/addOrder', async (req, res)=> {
        let serial_number = req.body.serial_number;
        let name = req.body.name;
        let customer = req.body.customer;
        let rent_on = req.body.rent_on;
        let rent_due = req.body.rent_due;
        let rent_pm = req.body.rent_pm;
        let agreement = req.body.agreement;
        let orderDetails = {
            serial_number: serial_number,
            name: name,
            customer: customer,
            rent_on: rent_on,
            rent_due: rent_due,
            rent_pm: rent_pm,
            agreement: agreement,
        }
        await Order.create(orderDetails, (err, order) => {
            if(err) {
                res.json({ error: "Could save the order at the moment." });
            } else {
                res.json({ order: order });
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

    app.post('/deleteProduct', async (req, res) => {
        await Product.findByIdAndDelete(req.body.id, (err) => {
            if(err) {
                res.json({ error: "Error Deleting the Product!" });
            } else {
                res.json({ success: "Product Deletion Successful" });
            }
        });
    });

    app.post('/deleteOrder', async (req, res) => {
        await Order.findByIdAndDelete(req.body.id, (err) => {
            if(err) {
                res.json({ error: "Error Deleting the Order!" });
            } else {
                res.json({ success: "Order Deletion Successful" });
            }
        });
    });
}