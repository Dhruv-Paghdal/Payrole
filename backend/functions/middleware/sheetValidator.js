const path = require('path');
const fs = require('fs');
const validateSheetFormat = (req, res, next) => {
    const validFormat = [".xlsx", ".xls", ".xlsm", ".xlsb", ".csv"];
    if (!req.file || validFormat.indexOf(path.extname(req.file.originalname).toLocaleLowerCase()) < 0) {
        fs.unlinkSync(path.join(process.cwd(), 'public', 'uploads', 'company', req.params.companyId, `${req.body.month}-${req.body.year}_TimeSheet${path.extname(req.file.originalname)}`))        
        return res.status(400).json({ status: 400, message: "Please upload your file in xlsx, xls, xlsm, xlsb or csv format", data: "" });
    }
    next();
};

module.exports = validateSheetFormat;