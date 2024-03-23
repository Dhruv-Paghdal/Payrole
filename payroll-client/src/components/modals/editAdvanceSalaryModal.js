import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import moment from 'moment';

const EditAdvanceSalaryModal = (props) => {
    const data = props.modalData[0];
    console.log(data);
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit advance salary
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Row className="mb-3">
                    <Col><Form.Label>Employee name</Form.Label></Col>
                    <Col><Form.Control type="text" placeholder="" value={data.employeeDetail[0].name} disabled/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Employee ID</Form.Label></Col>
                    <Col><Form.Control type="text" placeholder="" value={data.employeeDetail[0].employeeId} disabled/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Amount</Form.Label></Col>
                    <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" value={data.amount}/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Type</Form.Label></Col>
                    <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" value={data.type}/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Date</Form.Label></Col>
                    <Col><Form.Control type="date" style={{background: "#FFFFFF"}} placeholder="" value={moment(data.date).format("YYYY-MM-DD")}/></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className='text-end'><Button type='submit' className='w-100'>Edit</Button></Col>
                </Row>
            </Form>       
        </Modal.Body>
    </>
  )
}

export default EditAdvanceSalaryModal