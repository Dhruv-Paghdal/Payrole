import React from 'react';
import Card from 'react-bootstrap/Card';
import LoginForm from './login/loginForm';
import ForgotPasswordForm from './login/forgotPasswordForm';
import ResetPasswordForm from './login/resetPasswordForm';
import OtpVerify from './login/otpVerify';
import "./css/login.css"

const LoginCard = () => {
  return (
    <div className='login'>
        <div>
            <p className='mainTitle pb-4 m-0 fs-2'>Payroll</p>
            <Card className="p-md-5 cardContainer">
                <Card.Body>
                    {/* <LoginForm /> */}
                    {/* <ForgotPasswordForm /> */}
                    {/* <OtpVerify /> */}
                    <ResetPasswordForm />
                </Card.Body>
            </Card>
        </div>
        <div className='imageContainer'>
        </div>
    </div>
  )
}

export default LoginCard