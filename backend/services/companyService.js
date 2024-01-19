const Company = require('../models/company');

exports.profile = async(req, res) => {
    try {
        const companyId = req.user;
        if(!companyId) {
            return res.status(400).json({staus:400, message: "CompanyId not found in request", data: ""}) 
        }
        const query = {
            isDeleted: false,
            _id: companyId
        }
        const companyDetails = await Company.findOne(query, "userName password startDate endDate subscriptionHistory mobile companyName companyCode companyAddress ownerDetail isActive");
        if(!companyDetails) {
            return res.status(400).json({staus:400, message: "No company found", data: ""}) 
        }
        return res.status(200).json({status: 200, message: "Company details found", data: companyDetails})
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error while getting company detail", data: ""}) 
    }
}

exports.edit = async(req, res) => {
    try {
        const companyId = req.user;
        if(!companyId) {
            return res.status(400).json({staus:400, message: "CompanyId not found in request", data: ""}) 
        }
        const query = {
            isDeleted: false,
            _id: companyId
        }
        const companyDetails = await Company.findOne(query);
        if(!companyDetails) {
            return res.status(400).json({staus:400, message: "No company found", data: ""}) 
        }
        const payload = {}
        if(req.body.company_name) {
            payload["companyName"] = req.body.company_name
        }
        if(req.body.mobile) {
            payload["mobile"] = req.body.mobile
        }
        if(req.body.company_code) {
            payload["companyCode"] = req.body.company_code
        }
        if(req.body.company_address) {
            payload["companyAddress"] = req.body.company_address
        }
        if(req.body.owner_detail) {
            payload["ownerDetail"] = req.body.owner_detail
        }
        const companyModified = await Company.updateOne(companyId, payload);
        if(!companyModified) {
            return res.status(400).json({staus:400, message: "Error while updating company detail", data: ""}) 
        }
        return res.status(202).json({status: 202, message: "Company details updated", data: companyModified})
    } catch (error) {
        return res.status(400).json({staus:400, message: "Error while updating company detail", data: ""}) 
    }
}