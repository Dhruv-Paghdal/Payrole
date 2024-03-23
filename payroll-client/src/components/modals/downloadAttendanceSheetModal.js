import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const DownloadAttendanceSheetModal = () => {
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Download attendance sheet
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
            <Row>
                <Col></Col>
                <Col className='text-end'><Button type='submit' className='w-100'>Download</Button></Col>
            </Row>
        </Form>       
        </Modal.Body>
    </>
  )
}

export default DownloadAttendanceSheetModal