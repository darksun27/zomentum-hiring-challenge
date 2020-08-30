const mongoose = require('mongoose');

function connect() {
    mongoose.connect("mongodb://localhost:27017/zomentum-ticket-booking", { useNewUrlParser: true, keepAlive: true, useUnifiedTopology: true }).then(()=> {
        console.log("Database Connected");
    }).catch((err)=> {
        console.log("Database Connection Error");
    });
}

module.exports = {
    connect
}
