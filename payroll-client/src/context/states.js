import React, {useState} from 'react';
import PayrollContext from "./payrollContext";
import { loginEnum, modalTypeEnum } from '../constValue';

const States = (props) => {
    const [loginCard, setLoginCard] = useState(loginEnum.login);
    const [modalType, setModalType] = useState(modalTypeEnum.detail);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    
  return (
    <PayrollContext.Provider value={{loginCard, setLoginCard, modalType, setModalType, modalShow, setModalShow, modalData, setModalData}}>
        {props.children}
    </PayrollContext.Provider>
  )
}

export default States;