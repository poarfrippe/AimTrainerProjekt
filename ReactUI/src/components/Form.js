import React, {useState} from 'react'
import FormSignup from './FormSignup'
import FormSignIn from './FormSignIn'
import FormSuccess from './FormSuccess'
import "./Form.css";

const Form = ({setusername, forSignUp}) => {
    const [isSubmitted, setIsSubmitted]=useState(false);

    function submitForm(){
        setIsSubmitted(true);
        setusername(localStorage.getItem("username"))
    }


    if (forSignUp) {
        return (
            <>
                <div className="form-container">
                    <div className="form-content-left">
                        <img src="images/Login.png" alt="" className="form-img"/>
                    </div>
                    {!isSubmitted ? <FormSignup submitForm={submitForm}/> : <FormSuccess forSignUp={forSignUp}/>}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="form-container">
                    <div className="form-content-left">
                        <img src="images/Login.png" alt="" className="form-img"/>
                    </div>
                    {!isSubmitted ? <FormSignIn submitForm={submitForm}/> : <FormSuccess forSignUp={forSignUp}/>}
                </div>
            </>
        )
    }
    
}

export default Form
