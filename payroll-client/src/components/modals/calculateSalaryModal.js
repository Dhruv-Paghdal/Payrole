import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const CalculateSalaryModal = () => {
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Monthly salary
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Row className="mb-3">
                <Col><Form.Label>Month</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Year</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Expense by company</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Working year</Form.Label></Col>
                <Col><Form.Control type="text" placeholder="" disabled/></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Attendance sheet</Form.Label></Col>
                <Col><Form.Control type="file" accept=".xlsx, .xls, .xlsm, .xlsb, .csv" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col className='text-end'><Button type='submit' className='w-100'>Calculate</Button></Col>
            </Row>
        </Form>       
        </Modal.Body>
    </>
  )
}

export default CalculateSalaryModal