import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import {PersonCircle, LockFill} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import PayrollContext from '../../context/payrollContext';
import { loginEnum } from '../../constValue';
import { login } from '../../services/indexService';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(PayrollContext);
  const {setLoginCard, setAlertData, setAlertShow, setAlertVariant} = context;
  const { register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = async(payload) => {
    const { success, status, data, message} = await login(payload);
    if(!success) {
      setAlertVariant("danger");
      setAlertShow(true);
      setAlertData(message);
    }
    else{
      localStorage.setItem("token", data);
      navigate("/home/dashboard");
    }
  }
  return (
    <>
      <Card.Title className='pb-3 text-center'>Log In</Card.Title>
      <Card.Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
              <InputGroup className='pb-2' style={{width: "100%"}}>
                  <InputGroup.Text style={{backgroundColor: "#f1f1f1", borderTopLeftRadius: "15px", borderBottomLeftRadius:"15px"}}><PersonCircle color='#0d6efd'/></InputGroup.Text>
                  <Form.Control className='loginText' type="text" placeholder="Username *" {...register("username", { required: {value: true, message: "Username is required"},minLength: {value: 5, message: "Minimum 5 characters required"}})}/>
              </InputGroup>
              <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.username && errors.username.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup className='pb-2' style={{width: "100%"}}>
                  <InputGroup.Text style={{backgroundColor: "#f1f1f1", borderTopLeftRadius: "15px", borderBottomLeftRadius:"15px"}}><LockFill color='#0d6efd'/></InputGroup.Text>
                  <Form.Control className='loginPassword' type="password" placeholder="Password *" {...register("password", { required: {value: true, message: "Password is required"},minLength: {value: 5, message: "Minimum 5 characters required"}})}/>
              </InputGroup>
              <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.password && errors.password.message}</p>
              <p className='py-3 m-0 text-end hoverEffect' style={{fontWeight: "bold",color: "#0d6efd"}} onClick={() => {setLoginCard(loginEnum.forgot_password)}}>Forgot Password?</p>
          </Form.Group>
          <div >
              <Button className='w-100' type='submit' >Login</Button>
          </div>
        </Form>
      </Card.Text>
    </>
  )
}

export default LoginForm