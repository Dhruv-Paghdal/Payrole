import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ModalFooter from 'react-bootstrap/esm/ModalFooter';

const DeleteEmployeeModal = (props) => {
    const data = props.modalData;
    const handleClose = props.handleClose;
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className="mb-3">
                <Col><Form.Label>Are you sure, you want to delete employee <b>{data.employeeId}</b> ?</Form.Label></Col>
            </Row>
        </Modal.Body>
        <ModalFooter>
            <Row className="mb-3">
                <Col>
                    <Row>
                        <Col><Button variant='danger' type='submit'>Delete</Button></Col>
                        <Col><Button onClick={()=>{handleClose()}}>Cancle</Button></Col>
                    </Row>
                </Col>
            </Row>
        </ModalFooter>     
    </>
  )
}

export default DeleteEmployeeModal