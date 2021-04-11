import {useState, useEffect} from 'react'


//dornoch bon login schaugen wosfuer responsecode kimp und donn holt username in local storage speichern oder net....
const useForm=(callback, validateInfo) =>{
    const [values, setValues]=useState({
        username: "",
        email: "",
        password: "",
        password2:""
    });
    const [errors, setErrors]=useState({});
    const [isSubmitting, setIsSubmitting]=useState(false)

    let username
    let email
    let password
    let password2

    const handleChange= e=>{
        const{name, value}=e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit= e=>{
        e.preventDefault();

        username = e.target.username.value
        email = e.target.email.value
        password = e.target.password.value
        password2 = e.target.password2.value

        if (username != "") {
            if (/\S+@\S+\.\S+/.test(email)){
                if (password.length >= 6) {
                    if (password2 === password) {
                        console.log("passt alles!!")

                        fetch("http://89.107.108.231:18787/register", {
                            method: "post",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                "username": username,
                                "email": email,
                                "password": password
                            })
                        }).then(function (response) {
                            if (response.status == 200) {
                                localStorage.setItem("username", username);
                            } else {
                                console.log("nana, i hon gelogen, den accoutn hots decht net erstellt...")
                            }
                            return response.text()
                        }).then(function (text){
                            console.log("response vom post: " + text)
                        }).catch(function (error) {
                            console.log(error)
                        })

                    } else {
                        console.log("password2 problem")
                    }
                } else {
                    console.log("password1 problem")
                }
            } else {
                console.log("email problem")
            }
        } else {
            console.log("username problem")
        }

        //localStorage.setItem("username", username);

        setErrors(validateInfo(values))
        setIsSubmitting(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            callback();
        }
    }, [errors]
    );

    return {handleChange, values, handleSubmit, errors, username, email, password};
};

export default useForm;
