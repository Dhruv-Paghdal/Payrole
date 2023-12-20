const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

exports.addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status:400, message:errors.array(), data:""});
    }
    const payload = req.body;
    const userExist = await User.findOne({mobile: payload.mobile});
    if(!userExist){
        const salt = await bcrypt.genSalt(10);
        payload["password"] = await bcrypt.hash(payload.password, salt);
        const newUser = await User.insertOne(payload);
        if (newUser) {
            return res.status(201).send({status:201, message:"User created successfully", data:""})
        }
        return res.status(400).send({status:400, message:"Error while creating user", data:""})
    }
    return res.status(400).send({status:400, message:"User already exist", data:""})
}