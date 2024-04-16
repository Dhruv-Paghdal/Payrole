require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services/databaseService');
const indexRoutes = require('./routes/index');
const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const salaryRoutes = require('./routes/salary');
const advanceSalaryRoutes = require('./routes/advanceSalary');
const miscellaneousRoutes = require('./routes/miscellaneous');
const middleWare = require('./middleware/userType');
const app = express();

const PORT = process.env.APP_PORT;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());

app.use("/index", indexRoutes);
app.use(middleWare.isAccessable());
app.use("/company", companyRoutes);
app.use("/employee", employeeRoutes);
app.use("/advance-salary", advanceSalaryRoutes);
app.use("/salary", salaryRoutes);
app.use("/misc", miscellaneousRoutes);

(async() => await services.connectDB())();
app.listen(PORT, ()=>{
    console.log(`App listing on http://localhost:${PORT}`)
});