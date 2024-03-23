import React from 'react';
import Button from 'react-bootstrap/Button';
import {PersonGear} from 'react-bootstrap-icons';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import AppModal from './modal';

const Profile = (props) => {
    const modalShow = props.modalShow;
    const setModalShow = props.setModalShow;
    const modalType = props.modalType;
    const setModalType = props.setModalType;
    const modalData = props.modalData;
    const setModalData = props.setModalData;
    const data = {
        "companyAddress": {
          "addressLine": "Plot. No. 3, Krishna-1 Industrial Estate",
          "landmark": "Near Mahakali Mandir Road",
          "city": "Kubadthal",
          "state": "Gujarat",
          "country": "India",
          "zipCode": 382430
        },
        "_id": "659e4da6c62e0d0c9d717de6",
        "userName": "admin",
        "password": "$2b$10$2nwnfKIjdoetVDOs6NaOW.vmVhpRWUTeCcTxYS0/v.XHldadW3lCy",
        "subscriptionHistory": [
          "10-01-2024 TO 18-01-2024",
          "19-01-2024 TO 31-01-2024",
          "10-01-2024 TO 18-01-2024",
          "19-01-2024 TO 31-01-2024",
          "10-01-2024 TO 18-01-2024",
          "19-01-2024 TO 31-01-2024",
          "10-01-2024 TO 18-01-2024",
          "19-01-2024 TO 31-01-2024",
          "10-01-2024 TO 18-01-2024",
          "19-01-2024 TO 31-01-2024"
        ],
        "isActive": true,
        "endDate": "2024-01-31T00:00:00.000Z",
        "startDate": "2024-01-19T00:00:00.000Z",
        "companyName": "HK Industries",
        "mobile": "1234567890",
        "companyCode": "HK2015",
        // "ownerDetail": [
          
        // ],
        "ownerDetail": [
          {
            "name": "Hiren Patel",
            "mobile": "9974962249",
            "email": "hirenpaghdal1972@gmail.com",
            "_id": "65a9032ea500b14492b4593a"
          },
          {
            "name": "Kirit Khorasiya",
            "mobile": "8905021380",
            "email": "kiritkhorasiya19@gmail.com",
            "_id": "65a9032ea500b14492b4593b"
          }
        ],
        "weekOffDay": "tuesday",
        "workingYear": "2023-24",
        "email": "bossbig2654@gmail.com"
      }
    const handelModal = (type) => {
      setModalData(data)
      setModalType(type);
      setModalShow(true);
    }  
  return (
    <>
      <div className='m-2 p-3 layoutContentCard' style={{background: "#FFFFFF", borderRadius: "15px"}}>
        <div className='content-flex'>
            <div>
                <h3 className='navbarTitle'>{data.companyName.toUpperCase()}</h3>
                <p>Here's your profile</p>
            </div>
            <div>
              <Button className='w-100' onClick={()=>handelModal("editCompanyProfile")}><PersonGear /> Edit profile</Button>
            </div>
        </div>
        <hr />
        <div>
          <Row>
            <Col lg={true} className='mb-4'>
              <h6>Email</h6>
              <Form.Control type="text" disabled placeholder="" value={data?.email}/>
            </Col>
            <Col lg={true} className='mb-4'>
              <h6>Mobile</h6>
              <Form.Control type="text" disabled placeholder="" value={data?.mobile}/>
            </Col>
            <Col lg={true} className='mb-4'>
              <h6>Company code</h6>
              <Form.Control type="text" disabled placeholder="" value={data?.companyCode}/>
            </Col>
          </Row>
          <Row>
            <Col lg={true} className='mb-4'>
              <h6>Working year</h6>
              <Form.Control type="text" disabled placeholder="" value={data?.workingYear}/>
            </Col>
            <Col lg={true} className='mb-4'>
              <h6>Subscription due date</h6>
              <Form.Control type="text" disabled placeholder="" value={moment(data.endDate).format("DD-MM-YYYY")}/>
            </Col>
            <Col lg={true} className='mb-4'>
              <h6>Status</h6>
              <Form.Control type="text" className={`text-${data.isActive ? "success" : "danger"}`} style={{fontWeight: "bold"}} disabled placeholder="" value={data.isActive ? "Active" : "Expired"}/>
            </Col>
          </Row>
          <Row>
            <Col lg={true} className='mb-4'>
              <h6>Company address</h6>
              <div style={{height: "130px", overflowX: "hidden", background: "#e9ecef", opacity: 1, padding: "0.375rem 0.75rem", fontSize: "1rem", fontWeight: "400", lineHeight: "1.5", color: "var(--bs-body-color)", border: "var(--bs-border-width) solid var(--bs-border-color)", borderRadius: "var(--bs-border-radius)"}}>
                {data.companyAddress.addressLine && <div className='mb-1'>{data?.companyAddress?.addressLine}, </div>}
                {data.companyAddress.landmark && <div className='mb-1'>{data?.companyAddress?.landmark}, </div>}
                {(data.companyAddress.city || data.companyAddress.state) && <div className='mb-1'>{data.companyAddress?.city}, {data.companyAddress?.state}</div>}
                {data.companyAddress.zipCode && <div className='mb-1'>{data?.companyAddress?.zipCode}</div>}
              </div>
            </Col>
            <Col lg={true} className='mb-4'>
            <h6>Subscription history</h6>
              <div style={{height: "130px", overflowX: "hidden", background: "#e9ecef", opacity: 1, padding: "0.375rem 0.75rem", fontSize: "1rem", fontWeight: "400", lineHeight: "1.5", color: "var(--bs-body-color)", border: "var(--bs-border-width) solid var(--bs-border-color)", borderRadius: "var(--bs-border-radius)"}}>
                {data.subscriptionHistory && data.subscriptionHistory.map((data, index)=>{
                  return <div className='mb-1' key={index}>{data}</div>
                })}
              </div>
            </Col>
            <Col lg={true} className='mb-4'>
              <h6>Week off day</h6>
              <Form.Control type="text" disabled placeholder="" value={data?.weekOffDay?.charAt(0).toLocaleUpperCase()+data?.weekOffDay?.slice(1)}/>
            </Col>
          </Row>
          <Row>
            <Col lg={true} className='mb-1'>
              <h6>Owner detail</h6>
              <div style={{height: "150px", overflowX: "hidden", background: "#e9ecef", opacity: 1, padding: "0.375rem 0.75rem", fontSize: "1rem", fontWeight: "400", lineHeight: "1.5", color: "var(--bs-body-color)", border: "var(--bs-border-width) solid var(--bs-border-color)", borderRadius: "var(--bs-border-radius)"}}>
              <ol>{data.ownerDetail && data.ownerDetail.map((data) => {
                  return<li className='mb-2' key={data._id}>
                      <>
                        <div>Name: {data?.name}</div>
                        <div>Mobile: {data?.mobile}</div>
                        <div>Email: {data?.email}</div>
                      </>
                    </li>
                })}</ol>
              </div>
            </Col>
          </Row>
        </div>
        <AppModal modalShow={modalShow} setModalShow={setModalShow} modalData={modalData} modalType={modalType}/>
      </div>
    </>
  )
}

export default Profile


// set height in css