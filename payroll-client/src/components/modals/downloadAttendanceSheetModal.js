import React, {useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useForm } from "react-hook-form";
import { attendaneSheetDownload } from '../../services/dashboardService';
import PayrollContext from '../../context/payrollContext';
import { saveAs } from 'file-saver';

const DownloadAttendanceSheetModal = () => {
    const context = useContext(PayrollContext);
    const {setAlertData, setAlertShow, setAlertVariant, setModalShow} = context;
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async(payload) => {
        const { success, status, data, message} = await attendaneSheetDownload(payload);
        if(!success) {
            setAlertVariant("danger");
            setAlertShow(true);
            setAlertData(message);
            setModalShow(false);
        }
        else{
            let blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, `ATTENDANCE_SHEET_${payload.month}.xlsx`);
            setModalShow(false);
        }
    }
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Download attendance sheet
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col><Form.Label>Month</Form.Label></Col>
                    <Col><Form.Control type="number" style={{background: "#FFFFFF"}} placeholder="" {...register("month", {required: {value: true, message: "Month is required"}, min: {value: 1, message: "Invalid month"}, max: {value:12, message: "Invalid month"}, minLength: {value:1, message: "Invalid month"}, maxLength: {value: 2, message: "Invalid month"}})}/> <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.month && errors.month.message}</p></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Year</Form.Label></Col>
                    <Col><Form.Control type="number" style={{background: "#FFFFFF"}} placeholder="" {...register("year", {required: {value: true, message: "Year is required"}, min: {value: 1000, message: "Invalid year"}, max: {value:9999, message: "Invalid year"}, minLength: {value:4, message: "Invalid year"}, maxLength: {value: 4, message: "Invalid year"}})}/> <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.year && errors.year.message}</p> </Col>
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