import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const EmployeeIncrementModal = (props) => {
    const data = props.modalData;
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Increment
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
           {props.individual && <Row className="mb-3">
                <Col><Form.Label>Employee ID</Form.Label></Col>
                <Col><Form.Control type="text" placeholder="" value={data.employeeId} disabled/></Col>
            </Row>}
            {props.individual && <Row className="mb-3">
                <Col><Form.Label>Name</Form.Label></Col>
                <Col><Form.Control type="text" placeholder="" value={data.name} disabled/></Col>
            </Row>}  
            <Row className="mb-3">
                <Col><Form.Label>Increment tye</Form.Label></Col>
                <Col>
                    <Row>
                        <Col><Form.Check label="Rs" type="radio" name="incrementType" value="RS"/></Col>
                        <Col><Form.Check label="%" type="radio" name="incrementType" value="%"/></Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Increment value</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col className='text-end'><Button type='submit' className='w-100'>Confirm</Button></Col>
            </Row>
        </Form>       
        </Modal.Body>
    </>
  )
}

export default EmployeeIncrementModal