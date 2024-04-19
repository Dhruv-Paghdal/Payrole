module.exports = {
    login: {
        username: {
            notEmpty: true,
            errorMessage: "Username cannot be empty",
        },
        password: {
            notEmpty: true,
            errorMessage: "Password cannot be empty",  
        }
    },
    resetPassword: {
        new_password: {
            notEmpty: true,
            errorMessage: "New Password cannot be empty", 
            isLength:{
                options: { min: 4},
                errorMessage: "Minimum 4 characters required"   
            },
        },
        confirm_password: {
            notEmpty: true,
            errorMessage: "Confirm Password cannot be empty",
            isLength:{
                options: { min: 4},
                errorMessage: "Minimum 4 characters required"   
            }, 
        }
    },
    otpVerify: {
        otp: {
            notEmpty: true,
            errorMessage: "OTP is required",
            isLength:{
                options: { min: 6, max: 6},
                errorMessage: "OTP must contain 6 digits"   
            },
        }
    },
    addEmployee: {
        name:{
            notEmpty: true,
            errorMessage: "Name cannot be empty",
            isLength:{
                options: { min: 3 },
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
        }
    },
    addAdvanceSalary: {
        employee: {
            notEmpty: true,
            errorMessage: "Employee is required",
        },
        amount: {
            notEmpty: true,
            errorMessage: "Advance salary amount is required",
            isInt: {
                options: {
                    gt: 0
                },
                errorMessage: "Advance salary amount must be integer and greater than 0."
            },
        },
        type: {
            notEmpty: true,
            errorMessage: "Advance salary type is required",
        },
        date: {
            notEmpty: true,
            errorMessage: "Advance salary date is required",
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
    },
    attendanceSheet: {
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
        }
    }
}