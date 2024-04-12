import React, {useState, useContext, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {CalendarCheck, InfoCircle, ThreeDots, CurrencyRupee, FiletypeXlsx, FiletypePdf, Trash} from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import AppModal from './modal';
import { modalTypeEnum, deleteTypeEnum } from '../constValue';
import PayrollContext from '../context/payrollContext';
import { workingYearList, salaryList, reportDownload } from '../services/dashboardService';
import { saveAs } from 'file-saver';
import './css/dashboard.css';

const Dashboard = () => {
  const context = useContext(PayrollContext);
  const { setModalShow, setModalType, setModalData, setAlertData, setAlertShow, setAlertVariant, setFilterPayload, refresh, setRefresh, setDeleteType } = context;
  const [workingYearListData, setWorkingYearList] = useState([]);
  const [curr, set_Curr] = useState(1);  
  const [totalPage, setTotalPage] = useState(1);  
  const [data, setData] = useState([]); 
  const { register, handleSubmit} = useForm();
  const handleModal = (type, id) => {
    if(type === modalTypeEnum.detail){
      const modalData = data.find((ele)=>{return(ele._id === id)});
      setModalType(modalTypeEnum.detail)
      setModalData(modalData);
    }
    if(type === modalTypeEnum.attendance){
      setModalType(modalTypeEnum.attendance)
    }
    if(type === modalTypeEnum.delete_data){
      const modalData = data.find((ele)=>{return(ele._id === id)});
      setDeleteType(deleteTypeEnum.salary_detial);
      setModalType(modalTypeEnum.delete_data);
      setModalData({
        month: modalData.month,
        year: modalData.year,
        _id: modalData._id
      })
    }
    setModalShow(true);
  };
  const pageChangeFunction = (p) => {
    if (p >= 1 && p <= totalPage) {
        set_Curr(p);
    }
  };
  const showPageItemsFunction = () => {
    const data = [];
    const numPage = 5;
    if (totalPage <= numPage) {
      for (let i = 1; i <= totalPage; i++) {
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
            const rightside = curr + numPage / 2 < totalPage;
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
            const end = Math.min(totalPage, Math.round(curr + numPage / 2));
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
                    onClick={() => pageChangeFunction(totalPage)}
                />
            );
    }
    return data;
  };
  const [payload, setPayload]= useState({page: curr, row: 5});
  const onChange = (data) => {
    setPayload({...payload, row: data.row ? parseInt(data.row) : 5, working_year: data.working_year ? data.working_year : workingYearListData[0]});
  }
  const handleReportDownload = async(id, type) => {
    const payload = {
      id,
      type
    }
    const { success, status, data, message} = await reportDownload(payload);
    if(!success) {
      setAlertVariant("danger");
      setAlertShow(true);
      setAlertData(message);
      setModalShow(false);
    }
    else{
      if(type === "XLSX") {
        let blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `SALARY_REPORT.xlsx`);
      }
      else{
        let blob = new Blob([data], {
          type: "application/pdf",
        });
        saveAs(blob, `SALARY_REPORT.pdf`);
      }
    }
  }
  useEffect(() => {(
    async() => {
      setFilterPayload({page: 1, row: 5, search: {}});
      const {success, status, data, message} = await workingYearList();
      if(!success) {
        setAlertVariant("danger");
        setAlertShow(true);
        setAlertData(message)
      }
      else{
        setWorkingYearList(data);
        setPayload({...payload, working_year: data[0]})
      }
    }
    )();
  }, []);
  useEffect(()=>{
    setPayload({
      ...payload,
      page: curr
    })
  },[curr])
  useEffect(() => {
    if (payload.working_year) {
      (async () => {
        const { success, data, message } = await salaryList(payload);
        if (!success) {
          setAlertVariant("danger");
          setAlertShow(true);
          setAlertData(message);
        } else {
          if (data.length) {
            setData(data[0].list);
            setTotalPage(parseInt(data[0].page.split(" ")[2]));
          } else {
            setData([]);
            set_Curr(1);
            setTotalPage(1);
          }
        }
      })();
    }
    else{
      setData([]);
      set_Curr(1);
      setTotalPage(1);
    }
    setRefresh(false);
  }, [refresh, payload]);
  return (
    <div className='m-2 p-3 layoutContentCard' style={{background: "#FFFFFF", borderRadius: "15px"}}>
      <div className='content-flex'>
        <div>
            <h3 className='navbarTitle'>Salary List</h3>
            <p>Here's your report of {payload?.working_year || workingYearListData[0]}</p>
        </div>
        <div>
            <Button className='w-100' onClick={()=>{handleModal(modalTypeEnum.attendance)}}><CalendarCheck /> Attendance Sheet</Button>
        </div>
      </div>
      <hr />
      <div>
        <header className='content-flex'>
          <div style={{display: "flex", alignItems: "center"}}>
            <p>Show</p>
            <Form className='px-2' onChange={handleSubmit(onChange)}>
              <Form.Select {...register("row")}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </Form.Select>
            </Form>
            <p>Entries</p>
          </div>
          <div>
            <Form onChange={handleSubmit(onChange)}>
              <Form.Select {...register("working_year")}>
                {
                  workingYearListData.map((ele, index) => {
                    return <option key={index} value={ele}>{ele}</option>
                  })
                }
              </Form.Select>
            </Form>
          </div>
        </header>
        <div className='my-3 custom-table-container'>
          <Table hover>
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Salary</th>
                <th>Detail</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{textAlign: "left"}}>
              {data.length > 0 ? data.map((data, index)=>{
                return <tr key={data._id}>
                  <td>
                    {data.month}
                  </td>
                  <td>
                    {data.year}
                  </td>
                  <td style={{color: "#198754", fontWeight: "bold"}}>
                    <CurrencyRupee />
                    {
                      (()=>{
                          let totalSalary = 0;
                          for (const employeeSalary of data.salaryDetails) {
                              totalSalary = totalSalary + ( parseFloat(employeeSalary.finalSalary) + parseFloat(employeeSalary.totalAdvanceSalary) )
                          }
                          return Math.round(totalSalary).toLocaleString();
                      })()
                    }
                  </td>
                  <td><InfoCircle className='hoverEffect' onClick={()=>{ handleModal(modalTypeEnum.detail, data._id)}}/></td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className='p-0 m-0'style={{backgroundColor: "transparent", borderColor: "transparent", color: "#000000"}}>
                        <ThreeDots className='hoverEffect'/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Header>Action</Dropdown.Header>
                        <Dropdown.Item onClick={()=>{handleModal(modalTypeEnum.delete_data, data._id)}}><Trash color='red'/> Delete</Dropdown.Item>
                        <Dropdown.Header>Download</Dropdown.Header>
                        <Dropdown.Item onClick={()=>{handleReportDownload(data._id, "PDF")}}><FiletypePdf color='red'/> PDF</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleReportDownload(data._id, "XLSX")}}><FiletypeXlsx color='#198754'/> EXCEL</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              }) : <tr>
              <td colSpan={5}>
                <div className='text-center'>
                  No data to display
                </div>
              </td>
            </tr>}
            </tbody>
          </Table>
        </div>
        <footer className='d-flex justify-content-end'>
          <Pagination className='mb-0'>{showPageItemsFunction()}</Pagination>
          <AppModal />
        </footer>
      </div>
    </div>
  )
}

export default Dashboard;