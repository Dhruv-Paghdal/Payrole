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
        const sort = {};
        if (req.query.sort && req.query.sort_index) {
            sort[req.query.sort] = req.query.sort_index === "asc" ? 1 : -1;
        }
        else if (req.query.sort) {
            sort[req.query.sort] = 1;
        }
        else if (req.query.sort_index) {
            sort["name"] = req.query.sort_index === "asc" ? 1 : -1;
        }
        else {
            sort["name"] = 1;
        }
        if (req.query.search) {
            const json = JSON.parse(req.query.search);
            (json.field && json.value) ? conditions[json?.field] = {
                "$regex": json?.value,
                "$options": "i"
            } : "";
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
        if(!totalCount.length) {
            return res.status(200).json({status:200, message: "No employees list", data: totalCount})   
        }
        const totalPage = Math.ceil(totalCount[0].totalCount/row);
        const pipeline = [{
            $match: conditions
        }, {
            $sort: sort
        }, {
            $skip: offset,
        }, {
            $limit: row
        }];
        const employeeList = await Employee.aggregate(pipeline);
        if(!employeeList.length) {
            return res.status(200).json({status:200, message: "No employees list", data: employeeList})   
        }
        return res.status(200).json({status:200, message: "Employee list", data: {page: page.toString()+" of "+ totalPage.toString(), list:employeeList}});
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:400, message: "Error getting employee list", data: ""}) 
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
            return res.status(400).json({status:400, message: "No company found", data: ""}) 
        }
        if(!companyExist.companyCode) {
            return res.status(400).json({status:400, message: "Company code not found. Set company code.", data: ""}) 
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
            wageAmount: parseInt(req.body.wage_amount),
            workingHour: parseInt(req.body.working_hour),
            overTimeWagePercentage: parseFloat(req.body.over_time_wage_percentage),
            recessTime: parseInt(req.body.recess_time),
            travelAllowance: parseInt(req.body.travel_allowance)
        }
        const employee = await Employee.insertOne(payload);
        if(!employee) {
            return res.status(400).json({status:400, message: "Error while adding employee", data: ""}) 
        }
        return res.status(201).json({status:201, message: "Employee added sucessfully", data: ""})
    } catch (error) {
        return res.status(400).json({status:400, message: "Error while adding employee", data: ""}) 
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
            return res.status(400).json({status:400, message: "Error while updating employee", data: ""}) 
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
        if(req.body.wage_type) {
            payload["wageType"] = req.body.wage_type;
        }
        if(req.body.wage_amount) {
            payload["wageAmount"] = parseInt(req.body.wage_amount);
        }
        if(req.body.working_hour) {
            payload["workingHour"] = parseInt(req.body.working_hour);
        }
        if(req.body.over_time_wage_percentage) {
            payload["overTimeWagePercentage"] = parseFloat(req.body.over_time_wage_percentage);
        }
        if(req.body.recess_time) {
            payload["recessTime"] = parseInt(req.body.recess_time);
        }
        if(req.body.travel_allowance) {
            payload["travelAllowance"] = parseInt(req.body.travel_allowance);
        }
        const employeeUpdate = await Employee.updateOne(req.params.employeeID, payload);
        if(!employeeUpdate.modifiedCount) {
            return res.status(400).json({status:400, message: "Error while updating employee", data: employeeUpdate}) 
        }
        return res.status(202).json({status:202, message: "Employee updated successfully", data: ""}) 
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:400, message: "Error while updating employee", data: ""}) 
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
            return res.status(400).json({status:400, message: "Error getting employee detail", data: ""}) 
        }
        return res.status(200).json({status:200, message: "Employee details", data: employeeExist});

    } catch (error) {
        return res.status(400).json({status:400, message: "Error getting employee detail", data: ""}) 
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
            return res.status(400).json({status:400, message: "Error while deleteing employee", data: ""}) 
        }
        const payload = {
            isDeleted: true
        };
        const employeeDelete = await Employee.updateOne(req.params.employeeID, payload);
        if(!employeeDelete.modifiedCount) {
            return res.status(400).json({status:400, message: "Error while deleteing employee", data: ""}) 
        }
        return res.status(202).json({status:202, message: "Employee deleted successfully", data: ""}) 
    } catch (error) {
        return res.status(400).json({status:400, message: "Error while deleteing employee", data: ""}) 
    }
}

exports.appraisal = async(req, res) => {
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
            return res.status(400).json({status:400, message: "Error while adding employee appraisal", data: ""}) 
        } 
        const newSalary = (req.body.appraisal_type) === "%" ? parseInt(employeeExist.wageAmount) + ((parseInt(employeeExist.wageAmount) * parseInt(req.body.appraisal_value)) / 100) : parseInt(employeeExist.wageAmount) + parseInt(req.body.appraisal_value);
        const payload = {
            wageAmount : Math.floor(newSalary.toString())
        }
        const employeeAppraisal = await Employee.updateOne(req.params.employeeID, payload);
        if(!employeeAppraisal.modifiedCount) {
            return res.status(400).json({status:400, message: "Error while adding employee appraisal", data: ""}) 
        }
        return res.status(202).json({status:202, message: "Employee appraisal added", data: ""}) 
    } catch (error) {
        return res.status(400).json({status:400, message: "Error while adding employee appraisal", data: ""}) 
    }
}

exports.appraisalAll = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({status:400, message:errors.array(), data:""});
        }
        const company = req.user;
        const query = {
            isDeleted: false,
            company: ObjectId(company)
        }
        const employeeList = await Employee.findAll(query, "_id wageAmount");
        if(!employeeList) {
            return res.status(400).json({status:400, message: "Error while adding appraisal for all employee", data: ""}) 
        } 
        let newSalaryArray = [];
        switch (req.body.appraisal_type) {
            case "%":
                for (const employee of employeeList) {
                    const newSalary = parseInt(employee.wageAmount) + ((parseInt(employee.wageAmount) * parseInt(req.body.appraisal_value)) / 100);
                    newSalaryArray.push({_id: employee._id, wageAmount: newSalary.toString()})
                }
                break;
            
            case "RS":
                for (const employee of employeeList) {
                    const newSalary = parseInt(employee.wageAmount) + parseInt(req.body.appraisal_value)
                    newSalaryArray.push({_id: employee._id, wageAmount: newSalary.toString()})
                }
                break;
        
            default:
                for (const employee of employeeList) {
                    const newSalary = parseInt(employee.wageAmount) + parseInt(req.body.appraisal_value)
                    newSalaryArray.push({_id: employee._id, wageAmount: newSalary.toString()})
                }
                break;
        }
        const allEmployeeAppraisal = await Employee.model.updateMany(
            {_id: { $in: newSalaryArray.map(o => o._id) }}, 
            [{
                $set: {
                    wageAmount: {
                        $let: {
                            vars: { obj: { $arrayElemAt: [{ $filter: { input: newSalaryArray, as: "nsa", cond: { $eq: ["$$nsa._id", "$_id"] } } }, 0] } },
                            in: "$$obj.wageAmount"
                        }
                    }
                }
            }], { runValidators: true, multi: true });
        if(!allEmployeeAppraisal.modifiedCount) {
            return res.status(400).json({status:400, message: "Error while adding appraisal for all employee", data: ""}) 
        }
        return res.status(202).json({status:202, message: "All employee appraisal added", data: ""}) 
    } catch (error) {
        return res.status(400).json({status:400, message: "Error while adding appraisal for all employee", data: ""}) 
    }
}
