import React, {useState} from 'react'
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess'
import "./Form.css";

const Form = (setusername) => {
    const [isSubmitted, setIsSubmitted]=useState(false);

    function submitForm(){
        setIsSubmitted(true);
        
    }

    return (
        <>
        <div className="form-container">
            <div className="form-content-left">
                <img src="images/Login.png" alt="" className="form-img"/>
            </div>
            {!isSubmitted ? <FormSignup submitForm={submitForm} setusername={setusername}/> : <FormSuccess />}
        </div>
        
        </>
    );
}

export default Form
