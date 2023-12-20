require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const services = require('./services/databaseService');
const userRoutes = require('./routes/user');
const app = express();

const PORT = process.env.APP_PORT;

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());
app.use("/users", userRoutes);

(async() => await services.connectDB())();
app.listen(PORT, ()=>{
    console.log(`App listing on http://localhost:${PORT}`)
});