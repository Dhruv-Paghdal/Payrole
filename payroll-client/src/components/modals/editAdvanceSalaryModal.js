import React, {useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import moment from 'moment';
import PayrollContext from '../../context/payrollContext';
import { useForm } from "react-hook-form"; 
import { editAdvanceSalary } from '../../services/salaryService';

const EditAdvanceSalaryModal = (props) => {
    const propData = props.modalData[0];
    const context = useContext(PayrollContext);
    const {setAlertData, setAlertShow, setAlertVariant, setModalShow, setRefresh} = context;
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            "name": propData?.employeeDetail[0]?.name,
            "employeeId": propData?.employeeDetail[0]?.employeeId,
            "amount": propData?.amount,
            "type": propData?.type,
            "date": moment(propData?.date).format("YYYY-MM-DD"),
        }
    });
    const onSubmit = async(formData) => {
        const payload = {
            advanveSalaryID: propData?._id,
            amount: formData.amount,
            type: formData.type,
            date: formData.date
        }
        const {success, status, data, message} = await editAdvanceSalary(payload);
        if(!success) {
            setAlertVariant("danger");
        }
        else{
            setAlertVariant("success");
            setRefresh(true);
        }
        setAlertShow(true);
        setAlertData(message);
        setModalShow(false);
    }
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit advance salary
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col><Form.Label>Employee name</Form.Label></Col>
                    <Col><Form.Control type="text" placeholder="" {...register("name")} disabled/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Employee ID</Form.Label></Col>
                    <Col><Form.Control type="text" placeholder="" {...register("employeeId")} disabled/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Amount</Form.Label></Col>
                    <Col><Form.Control type="text" style={{background: "#FFFFFF"}} {...register("amount", {required: {value: true, message: "Amount is required"}, min: {value: 1, message: "Invalid month"}})}/> <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.amount && errors.amount.message}</p> </Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Type</Form.Label></Col>
                    <Col>
                        <Form.Select style={{backgroundColor: "#FFFFFF"}} {...register("type", {required: {value: true, message: "Type is required"}})}>
                                <option value="CASH">CASH</option>
                                <option value="NEFT">NEFT</option>
                                <option value="OTHER">OTHER</option>
                        </Form.Select> 
                        <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.type && errors.type.message} </p>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Date</Form.Label></Col>
                    <Col><Form.Control type="date" style={{background: "#FFFFFF"}} {...register("date", { valueAsDate: true, required: {value: true, message: "Date is required"}})} /><p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.date && errors.date.message}</p> </Col>
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