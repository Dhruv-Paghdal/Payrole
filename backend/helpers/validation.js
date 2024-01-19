module.exports = {
    login: {
        username: {
            notEmpty: true,
            errorMessage: "Mobile number cannot be empty",
        },
        password: {
            notEmpty: true,
            errorMessage: "Password cannot be empty",  
        }
    },
    addUser: {
        mobile: {
            notEmpty: true,
            errorMessage: "Mobile number cannot be empty",
            isLength:{
                options: { min: 10 , max : 10},
                errorMessage: "Enter a valid mobile number"   
            },
        },
        email: {
            optional: {
                checkFalsy: true,
            },
            isEmail: true,
            errorMessage: "Enter a valid email address",
        },
        name: {
            notEmpty: true,
            errorMessage: "Name cannot be empty",
            isLength:{
                options: { min: 3 , max : 10},
                errorMessage: "Name must be greater then 3 character"   
            },
        },
        password: {
            notEmpty: true,
            errorMessage: "Password cannot be empty",  
        }
    },
    addEmployee: {
        name:{
            notEmpty: true,
            errorMessage: "Name cannot be empty",
            isLength:{
                options: { min: 3 , max : 10},
                errorMessage: "Name must be greater then 3 character"   
            },
        },
        mobile: {
            notEmpty: true,
            errorMessage: "Mobile number cannot be empty",
            isLength:{
                options: { min: 10 , max : 10},
                errorMessage: "Enter a valid mobile number"   
            },
        },
        email: {
            optional: {
                checkFalsy: true,
            },
            isEmail: true,
            errorMessage: "Enter a valid email address",
        },
        degisnation: {
            notEmpty: true,
            errorMessage: "Degisnation cannot be empty",
        },
        wage_type: {
            notEmpty: true,
            errorMessage: "Wage type cannot be empty",
        },
        wage_amount: {
            notEmpty: true,
            errorMessage: "Wage amount cannot be empty",
        }
    }
}