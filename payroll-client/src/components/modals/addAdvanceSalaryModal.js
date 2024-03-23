import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const AddAdvanceSalaryModal = () => {
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Advance salary
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Row className="mb-3">
                <Col><Form.Label>Employee</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Amount</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Type</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Date</Form.Label></Col>
                <Col><Form.Control type="date" style={{background: "#FFFFFF"}} placeholder="" /></Col>
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

export default AddAdvanceSalaryModal