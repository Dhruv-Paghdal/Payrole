const multer = require('multer');
const {check, checkSchema, query, param} = require('express-validator');
const validation = require('../helpers/validation')
const path = require('path');
const fs = require('fs');
const salaryRouter = require('express').Router();
const salaryService = require('../services/salaryService');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!fs.existsSync(path.join(__dirname, "../public/uploads/company"))){
            fs.mkdirSync(path.join(__dirname, "../public/uploads/company"), { recursive: true });
        }
        cb(null, path.join(__dirname, "../public/uploads/company"));
    },
    filename: function (req, file, cb) {
      const renamedFile = req.body.month + "-" + req.body.year + "_TimeSheet" + path.extname(file.originalname);
      cb(null, renamedFile)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
                    const validFormat = [".xlsx", ".xls", ".xlsm", ".xlsb", ".csv"];
                    if(validFormat.indexOf(path.extname(file.originalname).toLocaleLowerCase())<0){
                        file["hasError"] = true;
                        return cb(new Error("Please upload your file in xlsx, xls, xlsm, xlsb or csv format"));
                    }
                    cb(null, true);
                } 
});  

salaryRouter.get("/list", [
    query('page').notEmpty().withMessage('Page value is requried').isInt().withMessage('Value must be Integer'), 
    query('row').notEmpty().withMessage('Row value is requried').isInt().withMessage('Value must be Integer'),
], salaryService.list);
salaryRouter.post("/calculate", upload.single('sheet'), [checkSchema(validation.calculateSalary), check('sheet', 'Please upload your file in xlsx, xls, xlsm, xlsb or csv format').custom((value, {req}) => {
    const validFormat = [".xlsx", ".xls", ".xlsm", ".xlsb", ".csv"];
    if(validFormat.indexOf(path.extname(req.file.originalname).toLocaleLowerCase())<0){
        return false;
    }
    return true;
})], salaryService.calculate);
salaryRouter.get("/:salaryID/report/:fileType", [param('salaryID').notEmpty().withMessage("SalaryId is required"), param('fileType').notEmpty().withMessage("File type is required").isIn(["PDF", "XLSX"]).withMessage("Enter a valid file type")], salaryService.report);

module.exports = salaryRouter;

