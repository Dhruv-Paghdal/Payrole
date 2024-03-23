import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import {EnvelopeAtFill} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

const ForgotPasswordForm = () => {
  return (
    <>
        <Card.Title className='pb-3 text-center'>Reset your password</Card.Title>
        <Card.Text>
            <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup className='pb-3' style={{width: "100%"}}>
                    <InputGroup.Text style={{backgroundColor: "#f1f1f1", borderTopLeftRadius: "15px", borderBottomLeftRadius:"15px"}}><EnvelopeAtFill color='#0d6efd'/></InputGroup.Text>
                    <Form.Control className='loginText' type="email" placeholder="Email *" />
                </InputGroup>
            </Form.Group>
            <div>
                <Button className='w-100' type='submit'>Send Request</Button>
            </div>
            <p className='pt-3 m-0 text-center' style={{fontWeight: "bold",color: "#0d6efd"}}>Back to login</p>
            </Form>
        </Card.Text>
    </>
  )
}

export default ForgotPasswordForm;