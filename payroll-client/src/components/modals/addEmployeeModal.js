import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const AddEmployeeModal = () => {
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height: "75vh", overflowX: "hidden"}}>
        <Form >
            <Row className="mb-3">
                <Col><Form.Label>Name</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Mobile</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Email</Form.Label></Col>
                <Col><Form.Control type="email" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Degisnation</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Wage type</Form.Label></Col>
                <Col>
                    <Row>
                        <Col><Form.Check label="Hour" type="radio"  value="HOUR"/></Col>
                        <Col><Form.Check label="Day" type="radio"  value="DAY"/></Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Salary</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Working hour</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Recess time (in minutes)</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Travel allowance</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Overtime percentage</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col className='text-end'><Button type='submit' className='w-100'>Add</Button></Col>
            </Row>
        </Form>       
        </Modal.Body>
    </>
  )
}

export default AddEmployeeModal