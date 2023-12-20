const userRouter = require('express').Router();
const validation = require("../common/validation")
const { checkSchema } = require('express-validator');
const userService = require("../services/userService");

userRouter.post("/add", checkSchema(validation.addUser) ,userService.addUser);

module.exports = userRouter;