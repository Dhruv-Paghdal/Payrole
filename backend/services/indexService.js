const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Company = require("../models/company");

exports.login = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const data = req.body;
        const companyExist = await Company.findOne({userName: data.username});
        if (!companyExist) {
            return res.status(401).json({status: 401, message: "Invalid credentials", data: ""})
        }
        const verfiyPassword = bcrypt.compare(data.password, companyExist.password);
        if(!verfiyPassword){
            return res.status(401).json({status: 401, message: "Invalid credentials", data: ""})
        }
        const jwtData = {
            "id": companyExist._id,
            "isAdmin": companyExist.isAdmin
        }
        const token = jwt.sign(jwtData, process.env.JWT_KEY)
        if(!token){
            return res.status(400).json({status:400, message: "Error while login", data: ""}) 
        }
        return res.status(200).json({status: 200, message: "Login Successfull", data: token})
    } catch (error) {
        return res.status(400).json({status:400, message: "Error while login", data: ""}) 
    }
}