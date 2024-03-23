import React,{useState} from 'react';
import AppNavbar from './navbar';
import Dashboard from './dashboard';
import Salary from './salary';
import Employee from './employee';
import ErrorMessage from './errorMessage';
import Profile from './profile';
import './css/layout.css'

const Layout = () => {
  const [modalType, setModalType] = useState("detail");
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  return (
    <>
      <div className='mainlayout'>
        <div className='layoutNav'><AppNavbar /> </div>
        <div className='layoutContent'>
        {/* <ErrorMessage /> */}
        {/* <Dashboard modalType={modalType} setModalType={setModalType} modalShow={modalShow} setModalShow={setModalShow} modalData={modalData} setModalData={setModalData}/>  */}
        {/* <Salary modalType={modalType} setModalType={setModalType} modalShow={modalShow} setModalShow={setModalShow} modalData={modalData} setModalData={setModalData}/> */}
        <Employee modalType={modalType} setModalType={setModalType} modalShow={modalShow} setModalShow={setModalShow} modalData={modalData} setModalData={setModalData}/>
        {/* <Profile modalType={modalType} setModalType={setModalType} modalShow={modalShow} setModalShow={setModalShow} modalData={modalData} setModalData={setModalData}/> */}
        </div>
      </div>
    </>
  )
}

export default Layout