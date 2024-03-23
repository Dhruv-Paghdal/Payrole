import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CurrencyRupee} from 'react-bootstrap-icons'

const EmployeeDetailModal = () => {
    const data = {
        "_id": "65b4b4703295f68bef8b023a",
        "name": "ALPESH",
        "mobile": "1234567890",
        "email": "alpesh@gmail.com",
        "employeeId": "HK2015-01",
        "company": "659e4da6c62e0d0c9d717de6",
        "degisnation": "operator",
        "wageType": "DAY",
        "wageAmount": 330,
        "workingHour": 8,
        "overTimeWagePercentage": 1.5,
        "travelAllowance": 110,
        "recessTime": 30,
        "isDeleted": false,
        "createdOn": "2024-01-27T07:44:48.179Z",
        "updatedOn": "2024-01-30T10:28:56.420Z",
        "__v": 0
      }
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {data.employeeId}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Name</Col>
                <Col>{
                        (data.name.split(" ").length > 1) ? (data.name.split(" ")[0].charAt(0).toUpperCase() + data.name.split(" ")[0].slice(1).toLowerCase() + " " + data.name.split(" ")[1].charAt(0).toUpperCase() + data.name.split(" ")[1].slice(1).toLowerCase()) : (data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase())
                }</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Mobile</Col>
                <Col>{data.mobile}</Col>
            </Row>
            {data.email && <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Email</Col>
                <Col>{data.email}</Col>
            </Row>}
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Designation</Col>
                <Col>{data.degisnation}</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Wage type</Col>
                <Col>{data.wageType}</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Salary</Col>
                <Col style={{color: "#198754", fontWeight: "bold"}}><CurrencyRupee /> {data.wageAmount.toLocaleString()}</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Fixed working hour</Col>
                <Col>{data.workingHour} hr</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Recess time</Col>
                <Col>{data.recessTime} min</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Travel allowance</Col>
                <Col><CurrencyRupee /> {data.travelAllowance}</Col>
            </Row>
            <Row className='mb-3'>
                <Col style={{fontWeight: "500"}}>Overtime percentage</Col>
                <Col>{data.overTimeWagePercentage} %</Col>
            </Row>
        </Modal.Body>
    </>
  )
}

export default EmployeeDetailModal