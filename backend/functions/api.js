require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const databaseMiddleware = require('./middleware/databaseConnection');
const indexRoutes = require('./routes/index');
const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const salaryRoutes = require('./routes/salary');
const advanceSalaryRoutes = require('./routes/advanceSalary');
const miscellaneousRoutes = require('./routes/miscellaneous');
const authMiddleware = require('./middleware/userType');
const app = express();
const serverless = require('serverless-http');

const netlifyURL = "/.netlify/functions/api";

app.use(databaseMiddleware.connectDB());

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());

app.use(`${netlifyURL}/index`, indexRoutes);
app.use(authMiddleware.isAccessable());
app.use(`${netlifyURL}/company`, companyRoutes);
app.use(`${netlifyURL}/employee`, employeeRoutes);
app.use(`${netlifyURL}/advance-salary`, advanceSalaryRoutes);
app.use(`${netlifyURL}/salary`, salaryRoutes);
app.use(`${netlifyURL}/misc`, miscellaneousRoutes);

module.exports.handler = serverless(app);