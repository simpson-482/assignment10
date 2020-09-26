const express = require("express");
const fs = require("fs");
const path = require('path');

const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); //__dirname));

//Require routes file
//require('./routes/routes')(app);

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Setup listener
app.listen(PORT, function() {
    console.log("server.js - App listening on Port: " + PORT);
});