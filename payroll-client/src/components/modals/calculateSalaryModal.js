import React, {useContext, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useForm, Controller } from "react-hook-form";
import { calculateSalary } from '../../services/salaryService';
import { companyId } from '../../services/indexService';
import PayrollContext from '../../context/payrollContext';

const CalculateSalaryModal = () => {
    const context = useContext(PayrollContext);
    const {setAlertData, setAlertShow, setAlertVariant, setModalShow, setRefresh} = context;
    const { register, handleSubmit, formState: { errors }, control, setValue} = useForm();
    const onSubmit = async(formData) => {
        const payload = new FormData();
        for (const key in formData) {
            if (key === "file") {
                payload.append(key, formData[key][0]);
            } else {
                payload.append(key, formData[key]);
            }
        }
        const {success, status, data, message} = await companyId();
        const companyID = data._id;
        if(!success){
            setAlertVariant("danger");
            setAlertShow(true);
            setAlertData(message);
            setModalShow(false);
        }
        else{
            const {success, status, data, message} = await calculateSalary(payload, companyID);
            if(!success) {
                setAlertVariant("danger");
                setAlertShow(true);
                setAlertData(message);
                setModalShow(false);
            }
            else{
                setAlertVariant("success");
                setAlertShow(true);
                setAlertData(message);
                setModalShow(false);
                setRefresh(true);
            }
        }
    }
    useEffect(() => {
        (async()=>{
            const {success, status, data, message} = await companyId();
            setValue("working_year", (data.workingYear ? data.workingYear : ""))
        })()
    }, [])
    
  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Monthly salary
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col><Form.Label>Month</Form.Label></Col>
                    <Col><Form.Control type="number" style={{background: "#FFFFFF"}} placeholder="" {...register("month", {required: {value: true, message: "Month is required"}, min: {value: 1, message: "Invalid month"}, max: {value:12, message: "Invalid month"}, minLength: {value:1, message: "Invalid month"}, maxLength: {value: 2, message: "Invalid month"}})}/> <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.month && errors.month.message}</p> </Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Year</Form.Label></Col>
                    <Col><Form.Control type="number" style={{background: "#FFFFFF"}} placeholder="" {...register("year", {required: {value: true, message: "Year is required"}, min: {value: 1000, message: "Invalid year"}, max: {value:9999, message: "Invalid year"}, minLength: {value:4, message: "Invalid year"}, maxLength: {value: 4, message: "Invalid year"}})}/> <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.year && errors.year.message}</p> </Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Expense by company</Form.Label></Col>
                    <Col><Form.Control type="number" style={{background: "#FFFFFF"}} placeholder="" {...register("other_expense", {required: {value: true, message: "Expense done by company is required"}, min: {value: 0, message: "Invalid value"}})}/> <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.other_expense && errors.other_expense.message}</p> </Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Working year</Form.Label></Col>
                    <Col><Form.Control type="text" placeholder="" disabled {...register("working_year")}/></Col>
                </Row>
                <Row className="mb-3">
                    <Col><Form.Label>Attendance sheet</Form.Label></Col>
                    <Col>
                        <Controller
                            control={control}
                            name={"sheet"}
                            rules={{required: {value: true, message: "Attendance sheet is required"}}}
                            render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <input type="file" {...field} value={value?.fileName}
                                onChange={(event) => {
                                    onChange(event.target.files[0]);
                                }} style={{background: "#FFFFFF"}}/>
                            );
                            }}
                        />
                        <p className="pt-2 mb-0" style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.sheet && errors.sheet.message}</p>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className='text-end'><Button type='submit' className='w-100'>Calculate</Button></Col>
                </Row>
            </Form>       
        </Modal.Body>
    </>
  )
}

export default CalculateSalaryModal