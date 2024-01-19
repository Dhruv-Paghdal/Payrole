const companyRouter = require('express').Router();
const companyService = require('../services/companyService');

companyRouter.get("/profile", companyService.profile);
companyRouter.put("/edit", companyService.edit)

module.exports = companyRouter;