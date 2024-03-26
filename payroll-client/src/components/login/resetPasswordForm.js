import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PayrollContext from '../../context/payrollContext';
import { loginEnum } from '../../constValue';

const ResetPasswordForm = () => {
  const context = useContext(PayrollContext);
  const {setLoginCard} = context;
  return (
    <>
        <Card.Title className='pb-3 text-center'>Reset your password</Card.Title>
        <Card.Text>
            <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className='loginText' type="email" placeholder="New password *" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control className='loginText' type="email" placeholder="Confirm password *" />
            </Form.Group>
            <div>
                <Button className='w-100' type='submit' onClick={() => {setLoginCard(loginEnum.login)}}>Reset Password</Button>
            </div>
            </Form>
        </Card.Text>
    </>
  )
}

export default ResetPasswordForm