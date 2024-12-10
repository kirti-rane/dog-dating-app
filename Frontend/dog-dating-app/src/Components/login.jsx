import "./login.css"
import Navbar from "./Navbar"
import {useFormik} from "formik"
import * as Yup from "yup";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    const formik = useFormik({

        initialValues:{
            dogName:"",
            email:"",
            password:""
        },

        validationSchema: Yup.object({

            dogName: Yup.string().required("Dog name is required"),
            email: Yup.string().email("invalid email format").required("Owner's email is required"),
            password: Yup.string().required("Password is required")

        }),
        onSubmit:async (values)=>{

            //call the backend api using axios lib

            try{

                const payload = {

                    dogName: values.dogName,
                    email: values.email,
                    password: values.password

                }
                console.log("payload", payload)


                const response = await axios.post("http://localhost:4000/dogUser/login",payload)

                navigate('/home')
                console.log("response", response)

                formik.resetForm()
                // console.log(values)
            }
            catch(err){

                console.log(err)
            }
            
        }
    })

    return (

        <>
            <Navbar />

            <form onSubmit={formik.handleSubmit}>
                <label for="dogName">Dog Name:</label>
                <input 
                    type="text" 
                    id="dogName" 
                    name="dogName" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dogName}
                />
                {formik.touched.dogName && formik.errors.dogName ? <div>{formik.errors.dogName}</div>:null}

                <label for="email">Owner's Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}

                <label for="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div>:null}


                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Login