//imports
const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');

//application definition
const app = express();

//application middlewares
app.use(morgan('combined'));

//starting the server
const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started!");
    console.log("Listening on PORT ", chalk.inverse.green(server.address().port));
});

//handling server exit
process.on("SIGINT", () => {
    console.log(chalk.red("\nServer Turn off Sequence Initiated!"));
    console.log(chalk.yellow("Closing Server!"));
    server.close();
    console.log(chalk.green("Turn Off Sequence Complete! Exiting"));
    process.exit(1);
});