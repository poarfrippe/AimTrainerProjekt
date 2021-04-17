import React from 'react'

const FormSuccess = ({forSignUp}) => {
    
    //window.location.reload(true);
    
    return (
        <div className="form-content-right">
            {forSignUp ? <div className="form-success">Your account has been successfully registered! Please refresh the Page for everything to work properly</div> : <div className="form-success">Signed in successfully! Please refresh the Page for everything to work properly</div>}
            <img src="images/PhilippSuper.jpg" alt="success-image" className="form-img-2"/>
        </div>
    )
}

export default FormSuccess
