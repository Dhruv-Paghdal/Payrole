import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SalaryDetailModal = (props) => {
    const data = props.modalData.salaryDetails
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Salary details of {props.modalData.month} - {props.modalData.year}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: "80vh", overflowX: "hidden"}}>
            {
                data.map((ele, index)=>{
                    return <Accordion className='mb-2'>
                      <Accordion.Item eventKey={index}> 
                        <Accordion.Header>{ele.employee}</Accordion.Header>
                        <Accordion.Body>
                          <Card style={{ width: "auto" }}>
                            <Card.Body>
                              <Card.Text>
                                <Row className="mb-2">
                                  <Col className='text-dark'>Total working days</Col>
                                  <Col>{ele.totalWorkingDays} x ###</Col>
                                  <Col className='text-success'>7920</Col>
                                </Row>
                                {ele.totalTravelAllowance && <Row className="mb-2">
                                    <Col className='text-dark'>Total travel allowance</Col>
                                    <Col>{ele.totalWorkingDays} x ###</Col>
                                    <Col className='text-success'>{ele.totalTravelAllowance.toLocaleString()}</Col>
                                </Row>}
                                {ele.totalOverTimePeriod && <Row className="mb-2">
                                    <Col className='text-dark'>Total overtime hour</Col>
                                    <Col>{ele.totalOverTimePeriod}</Col>
                                    <Col className='text-success'>{ele.OverTimeSalary.toLocaleString()}</Col>
                                </Row>}
                                {ele.totalOtherExpenseByCompany && <Row className="mb-2">
                                    <Col className='text-dark'>Expense by company</Col>
                                    <Col></Col>
                                    <Col className='text-danger'>{ele.totalOtherExpenseByCompany.toLocaleString()}</Col>
                                </Row>}
                                {ele.totalAdvanceSalary && <Row className="mb-2">
                                    <Col className='text-dark'>Total Advance salary</Col>
                                    <Col></Col>
                                    <Col className='text-danger'>{ele.totalAdvanceSalary.toLocaleString()}</Col>
                                </Row>}
                                <Row className="mb-2">
                                    <Col className='text-dark'>Final salary</Col>
                                    <Col></Col>
                                    <Col className='text-primary' style={{fontWeight: 'bold'}}>{ele.finalSalary.toLocaleString()}</Col>
                                </Row>
                                <hr />
                                {ele.totalAdvanceSalary && <Row>
                                    <Col className='text-dark'>Advance salary list</Col>
                                    <Col>{ele.advanceList.map((advanceData)=>{
                                      return <>{advanceData.date} <br /></>
                                    })}</Col>
                                    <Col>{ele.advanceList.map((advanceData)=>{
                                      return <>{advanceData.amount.toLocaleString()} <br /></>
                                    })}</Col>
                                </Row>}
                                {ele.absent && <>
                                  <hr />
                                  <Row>
                                    <Col className='text-dark'>Absent list</Col>
                                    <Col>{ele.absent.map((absentDate)=>{
                                      return <>{absentDate} <br /></>
                                    })}</Col>
                                    <Col></Col>
                                  </Row>
                                </>}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                })
            }
        
        </Modal.Body>
    </>
  )
}

export default SalaryDetailModal;