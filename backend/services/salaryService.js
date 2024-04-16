const XLSX = require('xlsx');
const handlebars = require("handlebars");
const puppeteer = require('puppeteer');
const Company = require('../models/company');
const Employee = require('../models/employee');
const AdvanceSalary = require('../models/advanceSalary');
const Salary = require('../models/salary');
const ObjectId = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const templateFile = path.join(__dirname + "/../templates/index.html");

const puppeteerOptions = {
  headless: true,
  executablePath: null,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
};

exports.list = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: errors.array(), data: "" });
    }
    const company = req.user;
    if(!company) {
      return res.status(400).json({status:400, message: "CompanyId not found in header", data: ""}) 
    }
    const companyQuery = {
      isDeleted: false,
      _id: company
    }
    const companyDetails = await Company.findOne(companyQuery);
    if (!companyDetails) {
        return res.status(404).json({ status: 404, message: "No company found", data: "" })
    }
    if (!companyDetails.isActive) {
      return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
    }
    if (!companyDetails.workingYear) {
        return res.status(400).json({ status: 400, message: "Working-year not found. Please set working year", data: "" })
    } 
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
    if(totalCount.length == 0 || totalCount[0].totalCount == 0) {
        return res.status(200).json({status:200, message: "No salary list", data: []})   
    }
    const row = req.query.row > 0 ? parseInt(req.query.row) : 5;
    const page = req.query.page > 0 ? parseInt(req.query.page) : 1;
    const offset = (page-1)*row;
    const totalPage = Math.ceil(totalCount[0].totalCount/row);
    const pipeline = [{
      $match: conditions
    }, {
      $skip: offset
    }, {
      $limit: row
    }, {
      $lookup: {
        from: "employees",
        localField: "salaryDetails.employeeId",
        foreignField: "_id",
        as: "employeeDetails",
      }
    }];
    const salaryList = await Salary.aggregate(pipeline);
    if(!salaryList.length) {
        return res.status(200).json({status:200, message: "No salary list", data: []})   
    }
    return res.status(200).json({status:200, message: "Salary list", data: [{page: page.toString()+" of "+ totalPage.toString(), list:salaryList}]});
  } catch (error) {
    return res.status(400).json({status:400, message: "Error while getting salary list", data: ""}); 
  }
}

exports.calculate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
        return res.status(400).json({ status: 400, message: errors.array(), data: "" });
    }
    const companyId = req.user;
    if(!companyId) {
      fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
      return res.status(400).json({status:400, message: "CompanyId not found in header", data: ""}) 
    }
    if(companyId !== req.params.companyId) {
      fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
      return res.status(400).json({status:400, message: "CompanyId is incorrect", data: ""}) 
    }
    const excelSheetName = path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`);
    const companyQuery = {
        isDeleted: false,
        _id: companyId
    }
    const companyDetails = await Company.findOne(companyQuery);
    if (!companyDetails) {
        fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
        return res.status(404).json({ status: 404, message: "No company found", data: "" })
    }
    if (!companyDetails.isActive) {
        fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
        return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
    }
    if (!companyDetails.workingYear) {
        fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
        return res.status(400).json({ status: 400, message: "Working-year not found. Please set working year", data: "" })
    }
    const employeeQuery = {
        isDeleted: false,
        company: ObjectId(companyId)
    }
    const employeeList = await Employee.findAll(employeeQuery, "_id employeeId wageAmount workingHour overTimeWagePercentage travelAllowance recessTime")
    if (!employeeList) {
        fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`))
        return res.status(404).json({ status: 404, message: "No employee found", data: "" });
    }
    const startDate = new Date(moment(req.body.year+"-"+req.body.month, "YYYY-MM").startOf('month').format("YYYY-MM-DD"));
    const endDate = new Date(moment(req.body.year+"-"+req.body.month, "YYYY-MM").endOf('month').format("YYYY-MM-DD"));
    const advanceSalaryPipeline = [
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
    const employeeAdvanceSalary = await AdvanceSalary.aggregate(advanceSalaryPipeline);
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
      const advanceSalaryList = [];
      for (const advanceSalary of employeeAdvanceSalary) {
        if (employee._id.toString() == advanceSalary.employee.toString()) { 
          advanceSalaryList.push({date: moment(advanceSalary.date).format("DD-MM-YYYY"), amount: advanceSalary.amount, _id: advanceSalary._id}) 
        }
      }
      salaryArray.push({"employeeId": employee["employeeId"], "_id": employee["_id"],"fixedSalary": employee["wageAmount"], "fixedWorkingHour": employee["workingHour"],"overTimeWagePercentage": employee["overTimeWagePercentage"], "travelAllowance": employee["travelAllowance"], "recessTime":employee["recessTime"], "advanceSalaryList": advanceSalaryList, "leaveList": []})
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
        if (data["advanceSalaryList"]) {
          let total = 0;
          for (const advanceSalary of data["advanceSalaryList"]) {
            total += advanceSalary.amount
          }
          data["totalAdvanceSalary"] = total;
        }
        if(data["travelDays"] !== data["totalWorkingDays"]) {
          data["travelDays"] = data["totalWorkingDays"];
        }
        data["totalOther"] = data["totalWorkingDays"] * req.body.other_expense;
        data["regularSalary"] = data["totalWorkingDays"] * data["fixedSalary"];
        data["travelFair"] = data["travelDays"] * data["travelAllowance"];
        data["finalSalary"] = (data["regularSalary"] + data["travelFair"] + (data?.extraHourSalary ? data["extraHourSalary"] : 0)) - (data["totalOther"] + data["totalAdvanceSalary"])
        delete data["fixedWorkingHour"]; 
        delete data["overTimeWagePercentage"]; 
        delete data["recessTime"]; 
        delete data["travelDays"];
    } 
    const salary = [];
    for (const data of salaryArray) {
      const obj = {
        employee: data.employeeId,
        employeeId: data._id,
        fixedSalary: data.fixedSalary,
        travelAllowance: data.travelAllowance,
        totalWorkingDays: data.totalWorkingDays,
        totalOverTimePeriod: data?.extraHour,
        OverTimeSalary: data?.extraHourSalary,
        totalAdvanceSalary: data?.totalAdvanceSalary,
        totalOtherExpenseByCompany: data?.totalOther,
        totalTravelAllowance: data?.travelFair,
        finalSalary: data?.finalSalary,
        advanceList: data?.advanceSalaryList,
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
      fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`));
      return res.status(400).json({status:400, message: "Error while calculating employees salaries.", data: ""}) 
    }
    return res.status(200).json({ status: 200, message: "Employees salaries calculated successfully.", data: "" })
  } catch (error) {
    fs.unlinkSync(path.join(__dirname, `../public/uploads/company/${req.params.companyId}/${req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(req.file.originalname)}`));
    return res.status(400).json({status:400, message: "Error while calculating salary", data: error}); 
  }
}

exports.report = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: errors.array(), data: "" });
    }
    const company = req.user;
    if (!company) {
      return res.status(400).json({ status: 400, message: "CompanyId not found in request", data: "" })
    }
    const companyQuery = {
      isDeleted: false,
      _id: company
    }
    const companyDetails = await Company.findOne(companyQuery);
    if (!companyDetails) {
      return res.status(404).json({ status: 404, message: "No company found", data: "" })
    }
    if (!companyDetails.isActive) {
      return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
    }
    const pipeline = [{
      $match: {
        isDeleted: false,
        _id: ObjectId(req.params.salaryID),
        company: ObjectId(company)
      }
    }, {
      $lookup: {
        from: "employees",
        let: {"employee": "$salaryDetails.employeeId"},
        pipeline: [{
          $match: {
            $expr: {
              $and: [{
                $in: ["$_id","$$employee"]
              }]
            }
          }
        }, {
          $project: {
            name:1,
            mobile: 1,
            employeeId: 1,
          }
        }],
        as: "employeeData" 
      }
    }];
    const salaryDetail = await Salary.aggregate(pipeline);
    if(!salaryDetail) {
      return res.status(200).json({ status: 200, message: "No salary detail found", data: ""});
    }
    const salaryData = [];
    for (const data of salaryDetail[0].salaryDetails) {
      const obj = {
        "EMPLOYEE_ID": data.employee,
        "NAME": "",
        "PER_DAY_SALARY": data.fixedSalary,
        "WORKING_DAYS": data.totalWorkingDays,
        "WORKING_DAYS_SALARY": (parseInt(data.totalWorkingDays)*parseFloat(data.fixedSalary)).toLocaleString(),
        "OVER_TIME_PERIOD": data?.totalOverTimePeriod ? data.totalOverTimePeriod : "",
        "OVER_TIME_SALARY": data?.OverTimeSalary ? data.OverTimeSalary.toLocaleString() : "",
        "ADVANCE_SALARY": data?.totalAdvanceSalary ? data.totalAdvanceSalary.toLocaleString() : "",
        "COMPANY_EXPENSE": data?.totalOtherExpenseByCompany ? data.totalOtherExpenseByCompany.toLocaleString() : "",
        "TRAVEL_ALLOWANCE": data?.totalTravelAllowance ? data.totalTravelAllowance.toLocaleString() : "",
        "TRAVEL_ALLOWANCE_PER_DAY": data?.travelAllowance ? data.travelAllowance : "",
        "FINAL_SALARY": data.finalSalary.toLocaleString(),
        "ADVANCE_SALARY_LIST": data?.advanceList ? data.advanceList : "", 
        "ABSENT_LIST_1": data?.absent ? data.absent.slice(0, Math.ceil(data.absent.length / 2)) : "",
        "ABSENT_LIST_2": data?.absent ? data.absent.slice(Math.ceil(data.absent.length / 2)) : ""
      }
      for (const employee of salaryDetail[0].employeeData) {
        if(data.employeeId.toString() == employee._id.toString()) {
          obj["NAME"] = (employee.name.split(" ").length > 1) ? (employee.name.split(" ")[0].charAt(0).toUpperCase() + employee.name.split(" ")[0].slice(1).toLowerCase() + " " + employee.name.split(" ")[1].charAt(0).toUpperCase() + employee.name.split(" ")[1].slice(1).toLowerCase()) : (employee.name.charAt(0).toUpperCase() + employee.name.slice(1).toLowerCase());
          break;
        }
      }
      salaryData.push(obj);
    }
    if(req.params.fileType == "PDF") {
      const pdfData = {
        company: companyDetails.companyName.toUpperCase(),
        month: salaryDetail[0].month,
        year: salaryDetail[0].year,
        salaryData: salaryData
      }
      const browser = await puppeteer.launch(puppeteerOptions);
      const page = await browser.newPage();
      const labelHtml = fs.readFileSync(templateFile, 'utf8');
      handlebars.registerHelper('splitArray', function(array) {
        var result = [[], []];
        for (var i = 0; i < array.length; i++) {
          result[i % 2].push(array[i]);
        }
        return result;
      });
      const template = handlebars.compile(labelHtml);
      const html = template(pdfData);
      await page.setContent(html, {
          waitUntil: ['domcontentloaded', 'networkidle0', 'load']
      })
      const pdfBuffer = await page.pdf({
          format: 'A4',
      });
      res.setHeader("Content-Disposition", `attachment; filename=SALARY_REPORT ${salaryDetail[0].month}-${salaryDetail[0].year}.pdf`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      res.set("Content-Type", "application/pdf");
      await browser.close();
      res.send(pdfBuffer);
    }
    if (req.params.fileType == "XLSX") {
      for (const data of salaryData) {
        delete data.PER_DAY_SALARY;
        delete data.ABSENT_LIST_1;
        delete data.ABSENT_LIST_2;
        delete data.ADVANCE_SALARY_LIST;
        delete data.TRAVEL_ALLOWANCE_PER_DAY;
      }
      const sheetData = XLSX.utils.json_to_sheet(salaryData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheetData, `SALARY_${salaryDetail[0].month}`);
      const sheet=XLSX.write(workbook,{bookType: "xlsx",type:"buffer"});
      res.setHeader("Content-Disposition", `attachment; filename=SALARY_REPORT ${salaryDetail[0].month}-${salaryDetail[0].year}.xlsx`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.send(sheet);
    }
  } catch (error) {
    return res.status(400).json({status:400, message: "Error while generating salary report", data: error}); 
  }
}

exports.sheet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: errors.array(), data: "" });
    }
    const company = req.user;
    if (!company) {
      return res.status(400).json({ status: 400, message: "CompanyId not found in request", data: "" })
    }
    const companyQuery = {
      isDeleted: false,
      _id: company
    }
    const companyDetails = await Company.findOne(companyQuery);
    if (!companyDetails) {
      return res.status(404).json({ status: 404, message: "No company found", data: "" })
    }
    if (!companyDetails.isActive) {
      return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
    }
    const startDate = new Date(moment(req.body.year+"-"+req.body.month).startOf('month').format("YYYY-MM-DD")).toLocaleDateString().split("/")[0];
    const endDate = new Date(moment(req.body.year+"-"+req.body.month).endOf('month').format("YYYY-MM-DD")).toLocaleDateString().split("/")[0];
    const dateArray = [];
    for (let index = startDate; index <= endDate; index++) {
      dateArray.push(`${index}-${req.body.month}-${req.body.year}`)
    }
    const conditions = {
      isDeleted: false,
      company: ObjectId(company)
    }
    const employeeList = await Employee.aggregate([{$match: conditions}]);
    if(!employeeList.length) {
      return res.status(400).json({status:400, message: "No employee found", data: ""})   
    }
    const attendanceSheetArray = [];
    for (const date of dateArray) {
      for (const employee of employeeList) {
        const obj = {
          "EMPLOYEE_ID": employee.employeeId,
          "DATE": date,
          "PUNCH_IN": "",
          "PUNCH_OUT": "",
          "NAME": (employee.name.split(" ").length > 1) ? (employee.name.split(" ")[0].charAt(0).toUpperCase() + employee.name.split(" ")[0].slice(1).toLowerCase() + " " + employee.name.split(" ")[1].charAt(0).toUpperCase() + employee.name.split(" ")[1].slice(1).toLowerCase()) : (employee.name.charAt(0).toUpperCase() + employee.name.slice(1).toLowerCase())
        }
        attendanceSheetArray.push(obj)
      }
    }
    const sheetData = XLSX.utils.json_to_sheet(attendanceSheetArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheetData, `${req.body.month}-${req.body.year}`);
    const sheet=XLSX.write(workbook,{bookType: "xlsx",type:"buffer"});
    res.setHeader("Content-Disposition", `attachment; filename=ATTENDANCE_SHEET_${req.body.month}.xlsx`);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(sheet);
  } catch (error) {
    return res.status(400).json({status:400, message: "Error while generating attendance sheet", data: ""}); 
  }
}

exports.delete = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: errors.array(), data: "" });
    }
    const company = req.user;
    if (!company) {
      return res.status(400).json({ status: 400, message: "CompanyId not found in request", data: "" })
    }
    const companyQuery = {
      isDeleted: false,
      _id: company
    }
    const companyDetails = await Company.findOne(companyQuery);
    if (!companyDetails) {
      return res.status(404).json({ status: 404, message: "No company found", data: "" })
    }
    if (!companyDetails.isActive) {
      return res.status(400).json({ status: 400, message: "Subscription Ended. Please contact admin", data: "" })
    }
    const query = {
      _id : req.params.salaryID,
      isDeleted: false,
    }
    const salaryExist = await Salary.findOne(query);
    if(!salaryExist) {
        return res.status(404).json({status:404, message: "Salary data not found", data: ""}) 
    }
    const salaryUpdate = await Salary.deleteOne(req.params.salaryID);
    if(!salaryUpdate.modifiedCount) {
        return res.status(400).json({status:400, message: "Error while deleteing salary report", data: []}) 
    }
    return res.status(202).json({status:202, message: "Salary report deleted successfully", data: ""}) 
  } catch (error) {
    console.log(error);
    return res.status(400).json({status:400, message: "Error while deleteing salary report", data: ""}); 
  }
}