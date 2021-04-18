import {useState, useEffect} from 'react'


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
                                callback();
                            } else if (response.status == 405) {
                                setErrors({username: "username is already registered"})
                            } else if (response.status == 406) {
                                setErrors({email: "email is allready connected to other user"})
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

        setErrors(validateInfo(values))         //brauche oben irgendwie trotzdem die ganzen ifs weil das faxen macht und immer eins hinterher ist
        //console.log(errors)

        setIsSubmitting(true);
    }

    const handleSubmitSignIn= e=>{
        e.preventDefault();

        username = e.target.username.value
        password = e.target.password.value

        fetch("http://89.107.108.231:18787/login", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(function (response) {
            if (response.status == 200) {
                localStorage.setItem("username", username);
                callback();
            } else if (response.status == 405) {
                setErrors({username: "username does not exist"})
            } else if (response.status == 406) {
                setErrors({password: "wrong Password"})
            }
            return response.text()
        }).then(function (text){
            console.log("response vom post: " + text)
        }).catch(function (error) {
            console.log(error)
        })

    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            //callback();
        }
    }, [errors]);

    return {handleChange, values, handleSubmit, errors, handleSubmitSignIn};
};

export default useForm;
