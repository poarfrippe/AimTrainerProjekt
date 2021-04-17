import React from 'react'
import useForm from './useForm'
import "./Form.css"

const FormSignup = ({submitForm, setusername}) => {
    
    const {values, handleSubmitSignIn, handleChange, errors} = useForm(submitForm, setusername);

    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmitSignIn}>
                <h1>Sign In by filling out the information below</h1>
                <div className="form-inputs">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input id="username" type="text" name="username" className="form-input" placeholder="Enter your username" value={values.username} onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>} 
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input id="password" type="password" name="password" className="form-input" placeholder="Enter your password" value={values.password} onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>} 
                </div>
                <button className="form-input-btn" type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default FormSignup