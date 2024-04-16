const mongoose  = require('mongoose');

exports.connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
          dbName: "payroll-client",
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log("Bingo, DB connected successfully!!!!");
    } catch (error) {
        console.log("Opps, Error while connecting with DB!!!!");
        console.log(error);
    }
}

