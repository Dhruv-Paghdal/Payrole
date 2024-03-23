import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button'; 
import { PlusLg, DashLg } from 'react-bootstrap-icons';

const EditCompanyProfileModal = (props) => {
    const data = props.modalData;
    const [ownerDetailArray, setOwnerDetailArray] = useState([{ name: "", mobile: "", email: ""}])

    useEffect(()=>{
      if(data.ownerDetail.length) {
        const ary = [];
        for (const owner of data.ownerDetail) {
         ary.push({name: owner.name,
          mobile: owner.mobile,
          email: owner.email})
        }
        setOwnerDetailArray(ary);
      }
    }, []);
    const handelAdd = () => {
      setOwnerDetailArray([...ownerDetailArray, { name: "", mobile: "", email: "" }])
    }
    const handleChange = (index, e) => {
      const newFormValues = [...ownerDetailArray];
        newFormValues[index][e.target.name] = e.target.value;
        setOwnerDetailArray(newFormValues);
    }
    const handelRemove = (index) => {
      const newFormValues = [...ownerDetailArray];
        newFormValues.splice(index, 1);
        setOwnerDetailArray(newFormValues)
    }
  return (
    <>
      <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit profile
            </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: "75vh", overflowX: "hidden"}}>
        <Form >
          <Row className="mb-3">
              <Col lg={true}><Form.Label>Company name</Form.Label></Col>
              <Col lg={true}><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyName}/></Col>
          </Row>
          <Row className="mb-3">
              <Col lg={true}><Form.Label>Company code</Form.Label></Col>
              <Col lg={true}><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyCode}/></Col>
          </Row>
          <Row className="mb-3">
              <Col lg={true}><Form.Label>Working year</Form.Label></Col>
              <Col lg={true}><Form.Control type="email" style={{background: "#FFFFFF"}} placeholder="" value={data?.workingYear}/></Col>
          </Row>
          <Row className="mb-3">
              <Col lg={true}><Form.Label>Week off day</Form.Label></Col>
              <Col lg={true}><Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" value={data?.weekOffDay}/></Col>
          </Row>
          <hr />
          <Row>
            <Col lg={true}><Form.Label>Address</Form.Label></Col>
          </Row>
          <Row >
            <Col lg={true} className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Plot, Shop no., Building</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyAddress?.addressLine}/>
                </Col>
              </Row>
            </Col>
            <Col lg={true} className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Landmark</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyAddress?.landmark}/>
                </Col>
              </Row>
            </Col>
            <Col lg={true} className="mb-3">
              <Row>
                <Col>
                  <Form.Label>City</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyAddress?.city}/>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={true} className="mb-3">
              <Row>
                <Col>
                  <Form.Label>State</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyAddress?.state}/>
                </Col>
              </Row>
            </Col>
            <Col lg={true} className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Country</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyAddress?.country}/>
                </Col>
              </Row>
            </Col>
            <Col lg={true} className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Pincode</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.companyAddress?.zipCode}/>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col><Form.Label>Owner detail</Form.Label></Col>
            <Col className='text-end'><h4><PlusLg style={{fontSize: "23px"}} className='hoverEffect' onClick={()=>handelAdd()}/></h4></Col>
          </Row>
          {/* {ownerList} */}
          {
            ownerDetailArray.map((data,index) => (
               <Row  key={index}>
                      <Col lg={true} className="mb-3">
                        <Row>
                          <Col>
                            <Form.Label>Name</Form.Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Control type="text" style={{background: "#FFFFFF"}} placeholder="" value={data.name || ""} name="name" onChange={e => handleChange(index, e)}/>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={true} className="mb-3">
                        <Row>
                          <Col>
                            <Form.Label>Mobile</Form.Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Control type="text" style={{background: "#FFFFFF"}} name="mobile" placeholder="" value={data.mobile || ""} onChange={e => handleChange(index, e)}/>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={true} className="mb-3">
                        <Row>
                          <Col>
                            <Row>
                              <Form.Label>
                                <Row>
                                  <Col>Email</Col>
                                  <Col className='text-end'><DashLg style={{fontSize: "23px"}} className='hoverEffect' onClick={()=>handelRemove(index)}/></Col>
                                </Row>
                              </Form.Label>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Control type="text" style={{background: "#FFFFFF"}} name="email" placeholder="" value={data.email || ""} onChange={e => handleChange(index, e)}/>
                          </Col>
                        </Row>
                      </Col>
              </Row>
            ))
          }
          {/* {data.ownerDetail.length > 0 ? data.ownerDetail.map((data,index)=> {
            return <Row className="mb-3" id={`owner-${index+1}`}>
            <Col lg={true}><Form.Label>Name</Form.Label><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.name}/></Col>
            <Col lg={true}><Form.Label>Mobile</Form.Label><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.mobile}/></Col>
            <Col lg={true}><Form.Label>Email</Form.Label><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" value={data?.email}/></Col>
          </Row>
          }) : <Row className="mb-3" id='owner-1'>
            <Col lg={true}><Form.Label>Name</Form.Label><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            <Col lg={true}><Form.Label>Mobile</Form.Label><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
            <Col lg={true}><Form.Label>Email</Form.Label><Form.Control type="tel" style={{background: "#FFFFFF"}} placeholder="" /></Col>
          </Row>}
          <div className='additionalOwner'></div> */}
          <Row>
              <Col lg={true}><Button type='submit' className='w-100'>Edit</Button></Col>
          </Row>
        </Form>       
      </Modal.Body>
    </>
  )
}

export default EditCompanyProfileModal;

