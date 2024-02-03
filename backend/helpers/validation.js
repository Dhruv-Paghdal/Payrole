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
        },
        working_hour: {
            notEmpty: true,
            errorMessage: "Working hour cannot be empty",
        },
        over_time_wage_percentage: {
            notEmpty: true,
            errorMessage: "Over time wage percentage is requried"
        },
        travel_allowance: {
            notEmpty: true,
            errorMessage: "Travel allowance is requried"
        },
        recess_time: {
            notEmpty: true,
            errorMessage: "Recess time cannot be empty",
        }
    },
    employeeAppraisal: {
        appraisal_type: {
            notEmpty: true,
            errorMessage: "Appraisal type is required"
        },
        appraisal_value: {
            notEmpty: true,
            errorMessage: "Appraisal value is required",
            isInt: {
                options: {
                    gt: 0
                },
                errorMessage: "Appraisal value must be integer and greater than 0."
            },
        }
    },
    addUphand: {
        employee: {
            notEmpty: true,
            errorMessage: "Employee is required",
        },
        amount: {
            notEmpty: true,
            errorMessage: "Uphand amount is required",
            isInt: {
                options: {
                    gt: 0
                },
                errorMessage: "AppraiUphand amount must be integer and greater than 0."
            },
        },
        type: {
            notEmpty: true,
            errorMessage: "Uphand type is required",
        },
        date: {
            notEmpty: true,
            errorMessage: "Uphand date is required",
        }
    },
    calculateSalary: {
        month: {
            notEmpty: true,
            isInt: {
                options: {
                    gt: 0,
                    lt:13
                }
            },
            errorMessage: "Enter a valid month."
        },
        year: {
            notEmpty: true,
            isInt: {
                options: {
                    gt: 0,
                }
            },
            errorMessage: "Enter a valid year."
        },
        other_expense: {
            notEmpty: true,
            isInt: true,
            errorMessage: "Enter a valid other expense."
        }
    }
}