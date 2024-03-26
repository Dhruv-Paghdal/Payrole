import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorMessage = () => {
    const [show, setShow] = useState(false);
    (()=>{
        setTimeout(()=>{
            setShow(false)
        }, 5000)
    })()
  return (
    <div className='p-3' style={{position:"absolute", right: "0"}}>
        <Alert key={"danger"} variant={"danger"} show={show} style={{fontWeight: "500"}}>
            This is a error alert—check it out!
        </Alert>
    </div>
  )
}

export default ErrorMessage;