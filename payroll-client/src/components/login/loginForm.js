import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import {PersonCircle, LockFill} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import PayrollContext from '../../context/payrollContext';
import { Link } from 'react-router-dom';
import { loginEnum } from '../../constValue';

const LoginForm = () => {
  const context = useContext(PayrollContext);
  const {setLoginCard} = context;
  return (
    <>
      <Card.Title className='pb-3 text-center'>Log In</Card.Title>
      <Card.Text>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicUsername">
              <InputGroup className='pb-2' style={{width: "100%"}}>
                  <InputGroup.Text style={{backgroundColor: "#f1f1f1", borderTopLeftRadius: "15px", borderBottomLeftRadius:"15px"}}><PersonCircle color='#0d6efd'/></InputGroup.Text>
                  <Form.Control className='loginText' type="text" placeholder="Username *" />
              </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup className='pb-2' style={{width: "100%"}}>
                  <InputGroup.Text style={{backgroundColor: "#f1f1f1", borderTopLeftRadius: "15px", borderBottomLeftRadius:"15px"}}><LockFill color='#0d6efd'/></InputGroup.Text>
                  <Form.Control className='loginPassword' type="password" placeholder="Password *" />
              </InputGroup>
              <p className='py-3 m-0 text-end hoverEffect' style={{fontWeight: "bold",color: "#0d6efd"}} onClick={() => {setLoginCard(loginEnum.forgot_password)}}>Forgot Password?</p>
          </Form.Group>
          <div >
              <Link to="/home/dashboard"><Button className='w-100' type='submit' >Login</Button></Link>
          </div>
        </Form>
      </Card.Text>
    </>
  )
}

export default LoginForm