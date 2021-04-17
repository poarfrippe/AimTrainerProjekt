import React from 'react'
import "../../App.css"
import Form from '../Form';

export default function SignIn({setusername}){
    return (
        <>
           <Form setusername={setusername} forSignUp={false}/>
        </>
    );
}