import React,{useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import AppModal from './modal';
import Form from 'react-bootstrap/Form';
import {Calculator, PlusLg, PencilSquare, Sliders, CurrencyRupee} from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import PayrollContext from '../context/payrollContext';
import { modalTypeEnum } from '../constValue';
import './css/salary.css';

const Salary = () => {
    const context = useContext(PayrollContext);
    const { setModalShow, setModalType, setModalData} = context;
    const maxLimit = 10;
    const data = [
        {
          "_id": "65b73c924c0f25301d9671f9",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b4e23295f68bef8b0246",
          "amount": 1000,
          "type": "CASH",
          "date": "2023-12-17T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:50:10.861Z",
          "updatedOn": "2024-01-29T05:50:10.861Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b4e23295f68bef8b0246",
              "name": "VIJAY",
              "mobile": "1234567890",
              "email": "vijay@gmail.com",
              "employeeId": "HK2015-04"
            }
          ]
        },
        {
          "_id": "65b73cb6180d00264e5cb1fc",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b4e23295f68bef8b0246",
          "amount": 2000,
          "type": "CASH",
          "date": "2023-12-21T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:50:46.135Z",
          "updatedOn": "2024-01-29T05:50:46.135Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b4e23295f68bef8b0246",
              "name": "VIJAY",
              "mobile": "1234567890",
              "email": "vijay@gmail.com",
              "employeeId": "HK2015-04"
            }
          ]
        },
        {
          "_id": "65b73cc1180d00264e5cb202",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b4e23295f68bef8b0246",
          "amount": 1000,
          "type": "CASH",
          "date": "2023-12-27T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:50:57.465Z",
          "updatedOn": "2024-01-29T05:50:57.465Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b4e23295f68bef8b0246",
              "name": "VIJAY",
              "mobile": "1234567890",
              "email": "vijay@gmail.com",
              "employeeId": "HK2015-04"
            }
          ]
        },
        {
          "_id": "65b73cdd180d00264e5cb208",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b49d3295f68bef8b023e",
          "amount": 1500,
          "type": "CASH",
          "date": "2023-12-18T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:51:25.197Z",
          "updatedOn": "2024-01-29T05:51:25.197Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b49d3295f68bef8b023e",
              "name": "KALPESH",
              "mobile": "1234567890",
              "email": "kalpesh@gmail.com",
              "employeeId": "HK2015-02"
            }
          ]
        },
        {
          "_id": "65b73d70180d00264e5cb212",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b5533295f68bef8b0252",
          "amount": 1000,
          "type": "CASH",
          "date": "2023-12-13T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:53:52.280Z",
          "updatedOn": "2024-01-29T05:53:52.280Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b5533295f68bef8b0252",
              "name": "JAYESH",
              "mobile": "1234567890",
              "email": "jayesh@gmail.com",
              "employeeId": "HK2015-07"
            }
          ]
        },
        {
          "_id": "65b73d87180d00264e5cb218",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b5533295f68bef8b0252",
          "amount": 2000,
          "type": "CASH",
          "date": "2023-12-21T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:54:15.476Z",
          "updatedOn": "2024-01-29T05:54:15.476Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b5533295f68bef8b0252",
              "name": "JAYESH",
              "mobile": "1234567890",
              "email": "jayesh@gmail.com",
              "employeeId": "HK2015-07"
            }
          ]
        },
        {
          "_id": "65b73da3180d00264e5cb21e",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b5113295f68bef8b024a",
          "amount": 1000,
          "type": "CASH",
          "date": "2023-12-21T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:54:43.778Z",
          "updatedOn": "2024-01-29T05:54:43.778Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b5113295f68bef8b024a",
              "name": "HIMANT",
              "mobile": "1234567890",
              "email": "himant@gmail.com",
              "employeeId": "HK2015-05"
            }
          ]
        },
        {
          "_id": "65b73db8180d00264e5cb224",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b4c03295f68bef8b0242",
          "amount": 1000,
          "type": "CASH",
          "date": "2023-12-20T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:55:04.603Z",
          "updatedOn": "2024-01-29T05:55:04.603Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b4c03295f68bef8b0242",
              "name": "MAHENDRA",
              "mobile": "1234567890",
              "email": "mahendra@gmail.com",
              "employeeId": "HK2015-03"
            }
          ]
        },
        {
          "_id": "65b73dd1180d00264e5cb22a",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b4703295f68bef8b023a",
          "amount": 2000,
          "type": "CASH",
          "date": "2023-12-20T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:55:29.648Z",
          "updatedOn": "2024-01-29T05:55:29.648Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b4703295f68bef8b023a",
              "name": "ALPESH",
              "mobile": "1234567890",
              "email": "alpesh@gmail.com",
              "employeeId": "HK2015-01"
            }
          ]
        },
        {
          "_id": "65b73dde180d00264e5cb230",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b4703295f68bef8b023a",
          "amount": 500,
          "type": "CASH",
          "date": "2023-12-25T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:55:42.341Z",
          "updatedOn": "2024-01-29T05:58:44.410Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b4703295f68bef8b023a",
              "name": "ALPESH",
              "mobile": "1234567890",
              "email": "alpesh@gmail.com",
              "employeeId": "HK2015-01"
            }
          ]
        },
        {
          "_id": "65b73dfa180d00264e5cb236",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b5353295f68bef8b024e",
          "amount": 2000,
          "type": "CASH",
          "date": "2023-12-21T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:56:10.499Z",
          "updatedOn": "2024-01-29T05:56:10.499Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b5353295f68bef8b024e",
              "name": "MAHESH",
              "mobile": "1234567890",
              "email": "mahesh@gmail.com",
              "employeeId": "HK2015-06"
            }
          ]
        },
        {
          "_id": "65b73e03180d00264e5cb23c",
          "company": "659e4da6c62e0d0c9d717de6",
          "employee": "65b4b5353295f68bef8b024e",
          "amount": 500,
          "type": "CASH",
          "date": "2023-12-22T00:00:00.000Z",
          "isDeleted": false,
          "createdOn": "2024-01-29T05:56:19.373Z",
          "updatedOn": "2024-01-29T05:56:19.373Z",
          "__v": 0,
          "employeeDetail": [
            {
              "_id": "65b4b5353295f68bef8b024e",
              "name": "MAHESH",
              "mobile": "1234567890",
              "email": "mahesh@gmail.com",
              "employeeId": "HK2015-06"
            }
          ]
        }
      ];
    const [curr, set_Curr] = useState(1);  
    const handelModal = (type, data) => {
      if(type === modalTypeEnum.edit_advance_salary) {
        setModalData([data])
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
                    <h3 className='navbarTitle'>Calculate Salary</h3>
                    <p>Calculate monthly salary hassle free and seamlessly</p>
                </div>
                <div>
                    <Button className='w-100' onClick={()=>{handelModal(modalTypeEnum.calculate_salary)}}><Calculator /> Calculate</Button>
                </div>
            </div>
            <hr />
            <div>
                <div className='content-flex'>
                    <div>
                        <h3 className='navbarTitle'>Advance Salary</h3>
                        <p>Manage advance salaries of employees</p>
                    </div>
                    <div>
                        <Button className='w-100' onClick={()=>{handelModal(modalTypeEnum.advance_salary)}}><PlusLg /> Add advance salary</Button>
                    </div>
                </div>
                <header className='content-flex mt-3'>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
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
                        <Button onClick={()=>handelModal(modalTypeEnum.date_search_filter)}><Sliders /> Filter</Button>
                    </div>
                </header>
                <div className='my-3' style={{height: "50vh", overflowX: "hidden"}}>
                <Table hover responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "left"}}>
                        {
                            data.map((ele)=>{
                                return <tr key={data._id}>
                                    <td>{ele.employeeDetail[0].name}</td>
                                    <td>{ele.employeeDetail[0].employeeId}</td>
                                    <td>{moment(ele.date).format("DD-MM-YYYY")}</td>
                                    <td style={{color: "#198754", fontWeight: "bold"}}><CurrencyRupee /> {ele.amount.toLocaleString()}</td>
                                    <td><PencilSquare className={"hoverEffect"} onClick={()=>{handelModal(modalTypeEnum.edit_advance_salary, ele)}}/></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                </div>
                <footer className='d-flex justify-content-end'>
                <Pagination className='mb-0'>{showPageItemsFunction()}</Pagination>                
                </footer>
            </div>
            <AppModal />
        </div>
    </>
  )
}

export default Salary;