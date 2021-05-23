const mongoose = require('mongoose');

function connect() {
    mongoose.connect("mongodb+srv://admin:darksun27@cluster0.3snih.mongodb.net/respicare-inventory?retryWrites=true&w=majority", { useNewUrlParser: true, keepAlive: true, useUnifiedTopology: true }).then(()=> {
        console.log("Database Connected");
    }).catch((err)=> {
        console.log("Database Connection Error", err);
    });
}

module.exports = {
    connect
}
