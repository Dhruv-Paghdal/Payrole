import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';


const SearchFilterModal = (props) => {
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Customise search
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
            {props.showDate && <Row className="mb-3">
                <Col><Form.Label>Start date</Form.Label></Col>
                <Col><Form.Control type="date" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>}
            {props.showDate && <Row className="mb-3">
                <Col><Form.Label>End date</Form.Label></Col>
                <Col><Form.Control type="date" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>}
            <Row className="mb-3">
                <Col><Form.Label>Name</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Email</Form.Label></Col>
                <Col><Form.Control type="email" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Mobile</Form.Label></Col>
                <Col><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row className="mb-3">
                <Col><Form.Label>Employee ID</Form.Label></Col>
                <Col><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Row>
                        <Col className='mb-2'><Button type='reset' variant='danger' className='w-100'>Reset filter</Button></Col>                    
                        <Col><Button type='submit' className='w-100'>Show results</Button></Col>
                    </Row>
                </Col>
            </Row>
        </Form>       
        </Modal.Body>
    </>
  )
}

export default SearchFilterModal;