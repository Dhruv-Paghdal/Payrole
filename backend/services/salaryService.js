const XLSX = require('xlsx');
const Company = require('../models/company');
const Employee = require('../models/employee');
const Uphand = require('../models/uphand');
const Salary = require('../models/salary');
const ObjectId = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

exports.list = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: errors.array(), data: "" });
  }
  const company = req.user;
  const companyQuery = {
    isDeleted: false,
    _id: company
  }
  const companyDetails = await Company.findOne(companyQuery);
  if (!companyDetails) {
      return res.status(400).json({ status: 400, message: "No company found", data: "" })
  }
  if (!companyDetails.isActive) {
    return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
  }
  if (!companyDetails.workingYear) {
      return res.status(400).json({ status: 400, message: "Working-year not found. Please set working year", data: "" })
  }
  const row = req.query.row > 0 ? parseInt(req.query.row) : 5;
  const page = req.query.page > 0 ? parseInt(req.query.page) : 1;
  const offset = (page-1)*row;
  const conditions = {
    isDeleted: false,
    company: ObjectId(company),
    workingYear: req.query.working_year ? req.query.working_year : companyDetails.workingYear
  }
  const countPipeline = [{
    $group: {
      _id: null,
      totalCount: {
        $sum: {
          $cond: [{
            $and: [{
              $eq: ["$isDeleted", false]
            }, {
              $eq: ["$company", ObjectId(company)]
            }, {
              $eq: ["$workingYear", conditions.workingYear]
            }]
          }, 1, 0]
        }
      }
    }
  }];
  const totalCount = await Salary.aggregate(countPipeline);
  if(!totalCount.length) {
      return res.status(200).json({status:200, message: "No salary list", data: totalCount})   
  }
  const totalPage = Math.ceil(totalCount[0].totalCount/row);
  const pipeline = [{
    $match: conditions
  }, {
    $skip: offset
  }, {
    $limit: row
  }];
  const salaryList = await Salary.aggregate(pipeline);
  if(!salaryList.length) {
      return res.status(200).json({status:200, message: "No salary list", data: salaryList})   
  }
  return res.status(200).json({status:200, message: "Salary list", data: {page: page.toString()+" of "+ totalPage.toString(), list:salaryList}});
}

exports.calculate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
        return res.status(400).json({ status: 400, message: errors.array(), data: "" });
    }
    const companyId = req.user;
    const excelSheetName = path.join(__dirname, `../public/uploads/company/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`);
    if (!companyId) {
        return res.status(400).json({ status: 400, message: "CompanyId not found in request", data: "" })
    }
    const companyQuery = {
        isDeleted: false,
        _id: companyId
    }
    const companyDetails = await Company.findOne(companyQuery);
    if (!companyDetails) {
        return res.status(400).json({ status: 400, message: "No company found", data: "" })
    }
    if (!companyDetails.isActive) {
        return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
    }
    if (!companyDetails.workingYear) {
        return res.status(400).json({ status: 400, message: "Working-year not found. Please set working year", data: "" })
    }
    const employeeQuery = {
        isDeleted: false,
        company: ObjectId(companyId)
    }
    const employeeList = await Employee.findAll(employeeQuery, "_id employeeId wageAmount workingHour overTimeWagePercentage travelAllowance recessTime")
    if (!employeeList) {
        return res.status(400).json({ status: 400, message: "No employee found", data: "" });
    }
    const startDate = new Date(moment(req.body.year+"-"+req.body.month).startOf('month').format("YYYY-MM-DD"));
    const endDate = new Date(moment(req.body.year+"-"+req.body.month).endOf('month').format("YYYY-MM-DD"));
    const uphandPipeline = [
      {
        $match: {
          isDeleted: false,
          company: ObjectId(companyId),
          $expr: {
            $and: [
              {
                $gte: ["$date", startDate],
              },
              {
                $lte: ["$date", endDate],
              },
            ],
          },
        }
      }
    ]
    const employeeUphands = await Uphand.aggregate(uphandPipeline);
    const headerMapping = {
        "EMPLOYEE_ID": 'emp_id',
        "DATE": 'date',
        "PUNCH_IN": 'in',
        "PUNCH_OUT": 'out'
    };
    const employeeData = [];
    const workbook = XLSX.readFile(excelSheetName);
    const sheet_name_list = workbook.SheetNames;
    const sheet_number = 0;
    folder_name = sheet_name_list[sheet_number];
    const worksheet = workbook.Sheets[sheet_name_list[sheet_number]];
    const headers = {};
    for (const z in worksheet) {
        if (z[0] === '!') continue;
        let tt = 0;
        for (let i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        const col = z.substring(0, tt);
        const row = parseInt(z.substring(tt));
        const value = worksheet[z].w;
        if (row == 1 && value) {
            headers[col] = value;
            continue;
        }
        if (!employeeData[row]) employeeData[row] = {};
        employeeData[row][headerMapping[headers[col]]] = value;
    }
    employeeData.shift();
    employeeData.shift();
    const salaryArray = [];
    for (const employee of employeeList) {
      const uphandList = [];
      for (const uphand of employeeUphands) {
        if (employee._id.toString() == uphand.employee.toString()) { 
          uphandList.push({date: moment(uphand.date).format("DD-MM-YYYY"), amount: uphand.amount, _id: uphand._id}) 
        }
      }
      salaryArray.push({"employeeId": employee["employeeId"], "_id": employee["_id"],"fixedSalary": employee["wageAmount"], "fixedWorkingHour": employee["workingHour"],"overTimeWagePercentage": employee["overTimeWagePercentage"], "travelAllowance": employee["travelAllowance"], "recessTime":employee["recessTime"], "uphandList": uphandList, "leaveList": []})
    }
    for (const data of salaryArray) {
        for (const employee of employeeData) {
            let totalHour = 0;
            let inCompleteHour = 0;
            let extraHour = 0;
            let workingDay = 0;
            if (employee["emp_id"] == data["employeeId"]) {
                if(employee.in && employee.out) {
                    const inTime = moment(employee.in, "hh:mm:ss a");
                    const outTime = moment(employee.out, "hh:mm:ss a");
                    totalHour = moment.duration(outTime.diff(inTime)).asHours();
                    if (totalHour >= (data["fixedWorkingHour"] + moment.duration(data["recessTime"], 'minutes').asHours())) {
                      extraHour = totalHour - (data["fixedWorkingHour"] + moment.duration(data["recessTime"], 'minutes').asHours());
                      workingDay = 1;
                    }
                    else {
                      inCompleteHour = totalHour;
                    }
                   
                    data["travelDays"] = data?.travelDays ? (data.travelDays + 1) : 1;
                    data["totalWorkingDays"] = data?.totalWorkingDays ? (data.totalWorkingDays + workingDay) : workingDay;
                    data["extraHour"] = parseFloat(data?.extraHour) ? parseFloat(data.extraHour) + parseFloat(extraHour) : parseFloat(extraHour)
                    data["inCompleteHour"] = parseFloat(data?.inCompleteHour) ? parseFloat(data.inCompleteHour) + parseFloat(inCompleteHour) : parseFloat(inCompleteHour)
                }
                else{
                  const date = new Date(employee.date)
                  if((!companyDetails?.weekOffDay) || (companyDetails.weekOffDay.toLowerCase() !== moment(date).format("dddd").toLowerCase())) {
                    data["leaveList"].push(moment(date).format("DD-MM-YYYY"))
                  }
                }
            }
        }
        if(data["extraHour"] && data["inCompleteHour"]) {
          let extra = data["inCompleteHour"];
          let fix = data["fixedWorkingHour"] + moment.duration(data["recessTime"], 'minutes').asHours();
          // FINDING THE NEAREST NUMBER FOR INCOMPLETE HOUR BASED ON FIXED WOKRING HOUR
          // extra = 15, fix = 8.5 ==> extra = 17
          extra = extra + fix/2;
          extra = extra - (extra%fix);
          // CONVERTING EXTRA INTO HOUR
          // extra = 17 ==> hour = 2
          extra = extra / fix;
          if (data["extraHour"] >= extra) {
            data["extraHour"] = data["extraHour"] - extra;
            data["inCompleteHour"] = data["inCompleteHour"] + extra;
          }
        }
        if (data["inCompleteHour"]) {
          let fix = data["fixedWorkingHour"] + moment.duration(data["recessTime"], 'minutes').asHours();
          data["totalWorkingDays"] = data["totalWorkingDays"] + Math.round(data["inCompleteHour"] / fix);
        }
        delete data["inCompleteHour"]
        data["extraHour"] >= 2 ? data["extraHourSalary"] = (data["extraHour"] / 8) * data["overTimeWagePercentage"] * data["fixedSalary"]: delete data["extraHour"];
        if (data["uphandList"]) {
          let total = 0;
          for (const uphand of data["uphandList"]) {
            total += uphand.amount
          }
          data["totalUphand"] = total;
        }
        if(data["travelDays"] !== data["totalWorkingDays"]) {
          data["travelDays"] = data["totalWorkingDays"];
        }
        data["totalOther"] = data["totalWorkingDays"] * req.body.other_expense;
        data["regularSalary"] = data["totalWorkingDays"] * data["fixedSalary"];
        data["travelFair"] = data["travelDays"] * data["travelAllowance"];
        data["finalSalary"] = (data["regularSalary"] + data["travelFair"] + (data?.extraHourSalary ? data["extraHourSalary"] : 0)) - (data["totalOther"] + data["totalUphand"])
        delete data["fixedSalary"]; 
        delete data["fixedWorkingHour"]; 
        delete data["overTimeWagePercentage"]; 
        delete data["travelAllowance"]; 
        delete data["recessTime"]; 
        delete data["travelDays"];
    } 
    const salary = [];
    for (const data of salaryArray) {
      const obj = {
        employee: data.employeeId,
        employeeId: data._id,
        totalWorkingDays: data.totalWorkingDays,
        totalOverTimePeriod: data?.extraHour,
        OverTimeSalary: data?.extraHourSalary,
        totalAdvanceSalary: data?.totalUphand,
        totalOtherExpenseByCompany: data?.totalOther,
        totalTravelAllowance: data?.travelFair,
        finalSalary: data?.finalSalary,
        advanceList: data?.uphandList,
        absent: data?.leaveList,
      }
      salary.push(obj);
    }
    const payload = {
      company: companyId,
      workingYear: companyDetails.workingYear,
      month: req.body.month,
      year: req.body.year,
      salaryDetails:salary
    }
    const salaries = await Salary.insertOne(payload);
    if (!salaries) {
      return res.status(400).json({status:400, message: "Error while calculating employees salaries.", data: ""}) 
    }
    return res.status(200).json({ status: 200, message: "Employees salaries calculated successfully.", data: salaries })
}

exports.report = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: errors.array(), data: "" });
  }
  const company = req.user;
  const companyQuery = {
    isDeleted: false,
    _id: company
  }
  const companyDetails = await Company.findOne(companyQuery);
  if (!companyDetails) {
    return res.status(400).json({ status: 400, message: "No company found", data: "" })
  }
  if (!companyDetails.isActive) {
    return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
  }
  const query = {
    isDeleted: false,
    _id: req.params.salaryID,
    company: company
  }
  const salaryDetail = await Salary.findOne(query, "workingYear month year salaryDetails");
  if(!salaryDetail) {
    return res.status(200).json({ status: 200, message: "No salary detail found", data: ""});
  }
  const salaryData = [];
  for (const data of salaryDetail.salaryDetails) {
    const obj = {
      "EMPLOYEE_ID": data.employee,
      "WORKING_DAYS": data.totalWorkingDays,
      "OVER_TIME_PERIOD": data?.totalOverTimePeriod ? data.totalOverTimePeriod : "",
      "OVER_TIME_SALARY": data?.OverTimeSalary ? data.OverTimeSalary : "",
      "ADVANCE_SALARY": data?.totalAdvanceSalary ? data.totalAdvanceSalary : "",
      "COMPANY_EXPENSE": data?.totalOtherExpenseByCompany ? data.totalOtherExpenseByCompany : "",
      "TRAVEL_ALLOWANCE": data?.totalTravelAllowance ? data.totalTravelAllowance : "",
      "FINAL_SALARY": data.finalSalary,
    }
    salaryData.push(obj);
  }
  const sheetData = XLSX.utils.json_to_sheet(salaryData);
  const html = XLSX.utils.sheet_to_html(sheetData)
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheetData, `SALARY_${salaryDetail.month}`);
  const sheet=XLSX.write(workbook,{bookType: "xlsx",type:"buffer"});
  res.setHeader("Content-Disposition", `attachment; filename=SALARY_REPORT ${salaryDetail.month}-${salaryDetail.year}.xlsx`);
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(sheet);
  // res.status(200).json({ status: 200, message: "Salary detail found", data: salaryDetail});
}