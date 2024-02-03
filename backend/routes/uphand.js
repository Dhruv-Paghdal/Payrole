const uphandRouter = require('express').Router();
const uphandService = require('../services/uphandService');
const {checkSchema, param, query} = require('express-validator');
const validation = require('../helpers/validation');

uphandRouter.get("/list",[
    query('page').notEmpty().withMessage('Page value is requried').isInt().withMessage('Value must be Integer'), 
    query('row').notEmpty().withMessage('Row value is requried').isInt().withMessage('Value must be Integer')
], uphandService.list);
uphandRouter.post("/add", checkSchema(validation.addUphand), uphandService.add);
uphandRouter.put("/:uphandID/edit", param('uphandID').notEmpty().withMessage("Uphand ID is required"), uphandService.edit);

module.exports = uphandRouter;