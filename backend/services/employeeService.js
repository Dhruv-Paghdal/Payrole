const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Company = require('../models/company');
const Employee = require('../models/employee');

exports.list = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const company = req.user;
        const conditions = {
            isDeleted: false,
            company: ObjectId(company)
        }    
        let sort;
        switch (req.query.sort) {
            case "asc":
                sort = 1;
                break;

            case "desc":
                sort = -1;
                break;
        
            default:
                sort = 1;
                break;
        }
        const row = req.query.row > 0 ? parseInt(req.query.row) : 5;
        const page = req.query.page > 0 ? parseInt(req.query.page) : 1;
        const offset = (page-1)*row;
        const countPipeline = [{
            $group: {
                _id: null,
                totalCount: {
                    $sum: {
                        $cond: [{
                            $and: [
                                {
                                  $eq: ["$isDeleted", false]
                                },
                                {
                                  $eq: ["$company", ObjectId(company)]
                                }
                            ],
                        }, 1, 0]
                    }
                }
            }
        }];
        const totalCount = await Employee.aggregate(countPipeline);
        const totalPage = Math.ceil(totalCount[0].totalCount/row);
        const pipeline = [{
            $match: conditions
        }, {
            $sort: {
                name: sort
            }
        }, {
            $skip: offset,
        }, {
            $limit: row
        }];
        const employeeList = await Employee.aggregate(pipeline);
        if(!employeeList) {
            return res.status(400).json({staus:400, message: "Error getting employee list", data: ""})   
        }
        return res.status(200).json({staus:200, message: "Employee list", data: {page: page.toString()+" of "+ totalPage.toString(), list:employeeList}});
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error getting employee list", data: ""}) 
    }
}

exports.add = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const company = req.user;
        const query = {
            isDeleted: false,
            _id: company
        }
        const companyExist = await Company.findOne(query, "companyCode");
        if(!companyExist) {
            return res.status(400).json({staus:400, message: "No company found", data: ""}) 
        }
        if(!companyExist.companyCode) {
            return res.status(400).json({staus:400, message: "Company code not found. Set company code.", data: ""}) 
        }
        const employeeQuery = {
            isDeleted: false,
            company: company
        }
        const recentEmployee = await Employee.model.findOne(employeeQuery, null, {sort: {"createdOn": -1}});
        let employeeId;
        if(!recentEmployee){
            employeeId = companyExist.companyCode + "-" + "01"
        }
        else {
            let number = parseInt(recentEmployee.employeeId.split("-")[1]) + 1;
            if(number < 10){
                number = "0" + number.toString()
            }
            employeeId = companyExist.companyCode + "-" + number.toString()
        };
        const payload = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email ? req.body.email : "",
            employeeId: employeeId,
            company: company,
            degisnation: req.body.degisnation,
            wageType: req.body.wage_type,
            wageAmount: req.body.wage_amount,
        }
        const employee = await Employee.insertOne(payload);
        if(!employee) {
            return res.status(400).json({staus:400, message: "Error while adding employee", data: ""}) 
        }
        return res.status(201).json({staus:201, message: "Employee added sucessfully", data: ""})
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error while adding employee", data: ""}) 
    }
}

exports.edit = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const company = req.user;
        const query = {
            isDeleted: false,
            _id: ObjectId(req.params.employeeID),
            company: ObjectId(company)
        }
        const employeeExist = await Employee.findOne(query);
        if(!employeeExist) {
            return res.status(400).json({staus:400, message: "Error while updating employee", data: ""}) 
        }
        const payload = {};
        if(req.body.name) {
            payload["name"] = req.body.name;
        }
        if(req.body.mobile) {
            payload["mobile"] = req.body.mobile;
        }
        if(req.body.email) {
            payload["email"] = req.body.email;
        }
        if(req.body.degisnation) {
            payload["degisnation"] = req.body.degisnation;
        }
        if(req.body.wageType) {
            payload["wageType"] = req.body.wageType;
        }
        if(req.body.wageAmount) {
            payload["wageAmount"] = req.body.wageAmount;
        }
        const employeeUpdate = await Employee.updateOne(req.params.employeeID, payload);
        if(!employeeUpdate) {
            return res.status(400).json({staus:400, message: "Error while updating employee", data: ""}) 
        }
        return res.status(202).json({staus:202, message: "Employee updated successfully", data: ""}) 
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error while updating employee", data: ""}) 
    }
}

exports.detail = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const company = req.user;
        const query = {
            isDeleted: false,
            _id: ObjectId(req.params.employeeID),
            company: ObjectId(company)
        }
        const employeeExist = await Employee.findOne(query);
        if(!employeeExist) {
            return res.status(400).json({staus:400, message: "Error getting employee detail", data: ""}) 
        }
        return res.status(200).json({staus:200, message: "Employee details", data: employeeExist});

    } catch (error) {
        return res.status(400).json({staus:400, message: "Error getting employee detail", data: ""}) 
    }
}

exports.delete = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const company = req.user;
        const query = {
            isDeleted: false,
            _id: ObjectId(req.params.employeeID),
            company: ObjectId(company)
        }
        const employeeExist = await Employee.findOne(query);
        if(!employeeExist) {
            return res.status(400).json({staus:400, message: "Error while deleteing employee", data: ""}) 
        }
        const payload = {
            isDeleted: true
        };
        const employeeDelete = await Employee.updateOne(req.params.employeeID, payload);
        if(!employeeDelete) {
            return res.status(400).json({staus:400, message: "Error while deleteing employee", data: ""}) 
        }
        return res.status(202).json({staus:202, message: "Employee deleted successfully", data: ""}) 
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error while deleteing employee", data: ""}) 
    }
}