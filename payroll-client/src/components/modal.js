import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import SalaryDetailModal from './modals/salaryDetailModal';
import DownloadAttendanceSheetModal from './modals/downloadAttendanceSheetModal';
import CalculateSalaryModal from './modals/calculateSalaryModal';
import AddAdvanceSalaryModal from './modals/addAdvanceSalaryModal';
import SearchFilterModal from './modals/searchFilterModal';
import EditAdvanceSalaryModal from './modals/editAdvanceSalaryModal';
import AddEmployeeModal from './modals/addEmployeeModal';
import EmployeeDetailModal from './modals/employeeDetailModal';
import EditEmployeeModal from './modals/editEmployeeModal';
import DeleteEmployeeModal from './modals/deleteEmployeeModal';
import EmployeeIncrementModal from './modals/employeeIncrementModal';
import EditCompanyProfileModal from './modals/editCompanyProfileModal';

import "./css/modal.css"

const AppModal = (props) => {
  const show = props.modalShow;
  const setModalShow = props.setModalShow;
  const handleClose = () => {setModalShow(false)};
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      {(props.modalType === "detail") && <SalaryDetailModal modalData={props.modalData}/>}
      {(props.modalType === "attendance") && <DownloadAttendanceSheetModal />}
      {(props.modalType === "calculateSalary") && <CalculateSalaryModal />}
      {(props.modalType === "advanceSalary") && <AddAdvanceSalaryModal />}
      {(props.modalType === "editAdvanceSalary") && <EditAdvanceSalaryModal modalData={props.modalData}/>}
      {(props.modalType === "addEmployee") && <AddEmployeeModal />}
      {(props.modalType === "employeeDetail") && <EmployeeDetailModal />}
      {(props.modalType === "editEmployee") && <EditEmployeeModal modalData={props.modalData}/>}
      {(props.modalType === "deleteEmployee") && <DeleteEmployeeModal modalData={props.modalData} handleClose={handleClose}/>}
      {(props.modalType === "incrementEmployee") && <EmployeeIncrementModal individual={true} modalData={props.modalData}/>}
      {(props.modalType === "incrementAllEmployee") && <EmployeeIncrementModal individual={false}/>}
      {(props.modalType === "searchFilter") && <SearchFilterModal showDate={false}/>}
      {(props.modalType === "dateSearchFilter") && <SearchFilterModal showDate={true}/>}
      {(props.modalType === "editCompanyProfile") && <EditCompanyProfileModal modalData={props.modalData}/>}
    </Modal>
  )
}

export default AppModal;