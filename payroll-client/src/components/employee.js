import React,{useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import {PlusLg, InfoCircle, ThreeDots, CurrencyRupee, PencilSquare, Trash, CashStack, Sliders} from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import AppModal from './modal';
import PayrollContext from '../context/payrollContext';
import { modalTypeEnum } from '../constValue';

const Employee = () => {
    const context = useContext(PayrollContext);
    const { setModalShow, setModalType, setModalData} = context;
    const data = [
        {
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
        },
        {
          "_id": "65b4b49d3295f68bef8b023e",
          "name": "KALPESH",
          "mobile": "1234567890",
          "email": "kalpesh@gmail.com",
          "employeeId": "HK2015-02",
          "company": "659e4da6c62e0d0c9d717de6",
          "degisnation": "operator",
          "wageType": "DAY",
          "wageAmount": 225,
          "workingHour": 8,
          "overTimeWagePercentage": 1.5,
          "travelAllowance": 100,
          "recessTime": 30,
          "isDeleted": false,
          "createdOn": "2024-01-27T07:45:33.972Z",
          "updatedOn": "2024-01-30T10:29:24.403Z",
          "__v": 0
        },
        {
          "_id": "65b4b4c03295f68bef8b0242",
          "name": "MAHENDRA",
          "mobile": "1234567890",
          "email": "mahendra@gmail.com",
          "employeeId": "HK2015-03",
          "company": "659e4da6c62e0d0c9d717de6",
          "degisnation": "operator",
          "wageType": "DAY",
          "wageAmount": 210,
          "workingHour": 8,
          "overTimeWagePercentage": 1.5,
          "travelAllowance": 75,
          "recessTime": 30,
          "isDeleted": false,
          "createdOn": "2024-01-27T07:46:08.011Z",
          "updatedOn": "2024-01-30T10:29:33.601Z",
          "__v": 0
        },
        {
          "_id": "65b4b4e23295f68bef8b0246",
          "name": "VIJAY",
          "mobile": "1234567890",
          "email": "vijay@gmail.com",
          "employeeId": "HK2015-04",
          "company": "659e4da6c62e0d0c9d717de6",
          "degisnation": "operator",
          "wageType": "HOUR",
          "wageAmount": 240,
          "workingHour": 8,
          "overTimeWagePercentage": 1.5,
          "travelAllowance": 100,
          "recessTime": 30,
          "isDeleted": false,
          "createdOn": "2024-01-27T07:46:42.733Z",
          "updatedOn": "2024-01-30T10:29:41.161Z",
          "__v": 0
        },
        {
          "_id": "65b4b5113295f68bef8b024a",
          "name": "HIMANT",
          "mobile": "1234567890",
          "email": "himant@gmail.com",
          "employeeId": "HK2015-05",
          "company": "659e4da6c62e0d0c9d717de6",
          "degisnation": "operator",
          "wageType": "DAY",
          "wageAmount": 200,
          "workingHour": 8,
          "overTimeWagePercentage": 1.5,
          "travelAllowance": 75,
          "recessTime": 30,
          "isDeleted": false,
          "createdOn": "2024-01-27T07:47:29.564Z",
          "updatedOn": "2024-01-30T10:29:49.005Z",
          "__v": 0
        },
        {
          "_id": "65b4b5353295f68bef8b024e",
          "name": "MAHESH",
          "mobile": "1234567890",
          "email": "mahesh@gmail.com",
          "employeeId": "HK2015-06",
          "company": "659e4da6c62e0d0c9d717de6",
          "degisnation": "operator",
          "wageType": "DAY",
          "wageAmount": 300,
          "workingHour": 8,
          "overTimeWagePercentage": 1.5,
          "travelAllowance": 90,
          "recessTime": 30,
          "isDeleted": false,
          "createdOn": "2024-01-27T07:48:05.897Z",
          "updatedOn": "2024-01-30T10:29:56.139Z",
          "__v": 0
        },
        {
          "_id": "65b4b5533295f68bef8b0252",
          "name": "JAYESH",
          "mobile": "1234567890",
          "email": "jayesh@gmail.com",
          "employeeId": "HK2015-07",
          "company": "659e4da6c62e0d0c9d717de6",
          "degisnation": "operator",
          "wageType": "DAY",
          "wageAmount": 330,
          "workingHour": 8,
          "overTimeWagePercentage": 1.5,
          "travelAllowance": 120,
          "recessTime": 30,
          "isDeleted": false,
          "createdOn": "2024-01-27T07:48:35.764Z",
          "updatedOn": "2024-02-29T11:40:38.008Z",
          "__v": 0
        },
        {
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
          },
          {
            "_id": "65b4b49d3295f68bef8b023e",
            "name": "KALPESH",
            "mobile": "1234567890",
            "email": "kalpesh@gmail.com",
            "employeeId": "HK2015-02",
            "company": "659e4da6c62e0d0c9d717de6",
            "degisnation": "operator",
            "wageType": "DAY",
            "wageAmount": 225,
            "workingHour": 8,
            "overTimeWagePercentage": 1.5,
            "travelAllowance": 100,
            "recessTime": 30,
            "isDeleted": false,
            "createdOn": "2024-01-27T07:45:33.972Z",
            "updatedOn": "2024-01-30T10:29:24.403Z",
            "__v": 0
          },
          {
            "_id": "65b4b4c03295f68bef8b0242",
            "name": "MAHENDRA",
            "mobile": "1234567890",
            "email": "mahendra@gmail.com",
            "employeeId": "HK2015-03",
            "company": "659e4da6c62e0d0c9d717de6",
            "degisnation": "operator",
            "wageType": "DAY",
            "wageAmount": 210,
            "workingHour": 8,
            "overTimeWagePercentage": 1.5,
            "travelAllowance": 75,
            "recessTime": 30,
            "isDeleted": false,
            "createdOn": "2024-01-27T07:46:08.011Z",
            "updatedOn": "2024-01-30T10:29:33.601Z",
            "__v": 0
          },
          {
            "_id": "65b4b4e23295f68bef8b0246",
            "name": "VIJAY",
            "mobile": "1234567890",
            "email": "vijay@gmail.com",
            "employeeId": "HK2015-04",
            "company": "659e4da6c62e0d0c9d717de6",
            "degisnation": "operator",
            "wageType": "DAY",
            "wageAmount": 240,
            "workingHour": 8,
            "overTimeWagePercentage": 1.5,
            "travelAllowance": 100,
            "recessTime": 30,
            "isDeleted": false,
            "createdOn": "2024-01-27T07:46:42.733Z",
            "updatedOn": "2024-01-30T10:29:41.161Z",
            "__v": 0
          },
          {
            "_id": "65b4b5113295f68bef8b024a",
            "name": "HIMANT",
            "mobile": "1234567890",
            "email": "himant@gmail.com",
            "employeeId": "HK2015-05",
            "company": "659e4da6c62e0d0c9d717de6",
            "degisnation": "operator",
            "wageType": "DAY",
            "wageAmount": 200,
            "workingHour": 8,
            "overTimeWagePercentage": 1.5,
            "travelAllowance": 75,
            "recessTime": 30,
            "isDeleted": false,
            "createdOn": "2024-01-27T07:47:29.564Z",
            "updatedOn": "2024-01-30T10:29:49.005Z",
            "__v": 0
          },
          {
            "_id": "65b4b5353295f68bef8b024e",
            "name": "MAHESH",
            "mobile": "1234567890",
            "email": "mahesh@gmail.com",
            "employeeId": "HK2015-06",
            "company": "659e4da6c62e0d0c9d717de6",
            "degisnation": "operator",
            "wageType": "DAY",
            "wageAmount": 300,
            "workingHour": 8,
            "overTimeWagePercentage": 1.5,
            "travelAllowance": 90,
            "recessTime": 30,
            "isDeleted": false,
            "createdOn": "2024-01-27T07:48:05.897Z",
            "updatedOn": "2024-01-30T10:29:56.139Z",
            "__v": 0
          },
          {
            "_id": "65b4b5533295f68bef8b0252",
            "name": "JAYESH",
            "mobile": "1234567890",
            "email": "jayesh@gmail.com",
            "employeeId": "HK2015-07",
            "company": "659e4da6c62e0d0c9d717de6",
            "degisnation": "operator",
            "wageType": "DAY",
            "wageAmount": 330,
            "workingHour": 8,
            "overTimeWagePercentage": 1.5,
            "travelAllowance": 120,
            "recessTime": 30,
            "isDeleted": false,
            "createdOn": "2024-01-27T07:48:35.764Z",
            "updatedOn": "2024-02-29T11:40:38.008Z",
            "__v": 0
          }
      ];
    const maxLimit = 10;
    const [curr, set_Curr] = useState(1);
    const handelModal = (type, data) => {
        if(type === modalTypeEnum.edit_employee){
            setModalData(data)
        }
        if(type === modalTypeEnum.delete_employee){
            setModalData({
                employeeId: data.employeeId,
                _id: data._id
            })
        }
        if(type === modalTypeEnum.employee_increment){
            setModalData({
                employeeId: data.employeeId,
                name: data.name,
                _id: data._id
            })
        }
        setModalType(type);
        setModalShow(true);
    }
    const pageChangeFunction = (p) => {
        if (p >= 1 && p <= maxLimit) {
              set_Curr(p);
        }
    };
    const showPageItemsFunction = () => {
        const data = [];
        const numPage = 5;
        if (maxLimit <= numPage) {
            for (let i = 1; i <= maxLimit; i++) {
                data.push(
                    <Pagination.Item
                        key={i}
                        active={i === curr}
                        onClick={() => pageChangeFunction(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            const leftside = curr - numPage / 2 > 1;
            const rightside = curr + numPage / 2 < maxLimit;
            data.push(
                <Pagination.First
                    key="first"
                    onClick={() => pageChangeFunction(1)}
                />
            );
            data.push(
                <Pagination.Prev
                    key="prev"
                    onClick={() => pageChangeFunction(curr - 1)}
                />
            );
            if (leftside) {
                data.push(<Pagination.Ellipsis key="leftEllipsis" />);
            }
            const str = Math.max(1, Math.round(curr - numPage / 2));
            const end = Math.min(maxLimit, Math.round(curr + numPage / 2));
            for (let i = str; i <= end; i++) {
                data.push(
                    <Pagination.Item
                        key={i}
                        active={i === curr}
                        onClick={() => pageChangeFunction(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
            if (rightside) {
                data.push(<Pagination.Ellipsis key="rightEllipsis" />);
            }
            data.push(
                <Pagination.Next
                    key="next"
                    onClick={() => pageChangeFunction(curr + 1)}
                />
            );
            data.push(
                <Pagination.Last
                    key="last"
                    onClick={() => pageChangeFunction(maxLimit)}
                />
            );
        }
        return data;
    };
  return (
    <>
        <div className='m-2 p-3 layoutContentCard' style={{background: "#FFFFFF", borderRadius: "15px"}}>
            <div className='content-flex'>
                <div>
                    <h3 className='navbarTitle'>Employee List</h3>
                    <p>Here are your all employees</p>
                </div>
                <div>
                    <Button className='w-100' onClick={()=>{handelModal(modalTypeEnum.add_employee)}}><PlusLg /> Add Employee</Button>
                </div>
            </div>
            <hr />
            <div>
                <header className='content-flex'>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <p>Show</p>
                        <Form className='px-2'>
                        <Form.Select>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </Form.Select>
                        </Form>
                        <p>Entries</p>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button onClick={()=>handelModal(modalTypeEnum.search_filter)}><Sliders /> Filter</Button>
                            <Button onClick={()=>handelModal(modalTypeEnum.all_employee_increment)}><CashStack /> Increment</Button>
                        </ButtonGroup>
                        {/* <ButtonGroup>
                        </ButtonGroup> */}
                    </div>
                </header>
                <div className='my-3'style={{height: "62vh", overflowX: "hidden"}}>
                <Table hover responsive>
                    <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Salary</th>
                        <th>Detail</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "left"}}>
                    {data.map((data, index)=>{
                        return <tr key={data._id}>
                        <td>
                            {data.employeeId}
                        </td>
                        <td>
                            {
                                (data.name.split(" ").length > 1) ? (data.name.split(" ")[0].charAt(0).toUpperCase() + data.name.split(" ")[0].slice(1).toLowerCase() + " " + data.name.split(" ")[1].charAt(0).toUpperCase() + data.name.split(" ")[1].slice(1).toLowerCase()) : (data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase())
                            }
                        </td>
                        <td>
                            {data.mobile}
                        </td>
                        <td style={{color: "#198754", fontWeight: "bold"}}>
                           <CurrencyRupee /> {data.wageAmount.toLocaleString()}
                        </td>
                        <td>
                            <InfoCircle className='hoverEffect' onClick={()=>{handelModal(modalTypeEnum.employee_detail)}}/>
                        </td>
                        <td>
                        <Dropdown>
                        <Dropdown.Toggle className='p-0 m-0'style={{backgroundColor: "transparent", borderColor: "transparent", color: "#000000"}}>
                            <ThreeDots className='hoverEffect'/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Header>Action</Dropdown.Header>
                            <Dropdown.Item onClick={()=>handelModal(modalTypeEnum.edit_employee, data)}><PencilSquare color='#0d6efd' /> Edit</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handelModal(modalTypeEnum.delete_employee, data)}><Trash color='#dc3545'/> Delete</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handelModal(modalTypeEnum.employee_increment, data)}><CashStack color='#198754'/> Increment</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                        </td>
                        </tr>
                    })}
                    </tbody>
                 </Table>
                </div>
                <footer className='d-flex justify-content-end'>
                    <Pagination className='mb-0'>{showPageItemsFunction()}</Pagination>
                    <AppModal />
                </footer>
            </div>

        </div>
    </>
  )
}

export default Employee