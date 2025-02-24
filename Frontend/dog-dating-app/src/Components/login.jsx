import "./login.css"
import Navbar from "./Navbar"
import { useDispatch } from 'react-redux';
import {login} from '../Store/userSlice'
import {useFormik} from "formik"
import * as Yup from "yup";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import Footer from './Foooter'

function Login() {

    //instance 
    const navigate = useNavigate()
    const dispatch = useDispatch()


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

                console.log(response.data)
                navigate('/')
                dispatch(login(response.data))

                toast.success("Logged In Successfully!!",{

                    position: "top-right",
                        autoClose: 3000, // 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                })

                console.log("response", response)

                formik.resetForm()
                // console.log(values)
            }
            catch(err){

                toast.error("Opps!! Login UnSuccessful.. Try Again..",{

                    position: "top-right",
                        autoClose: 3000, // 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                })
                formik.resetForm()
                console.log(err)
            }
            
        }
    })

    return (

        <>
            <Navbar />

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="dogName">Dog Name:</label>
                <input 
                    type="text" 
                    id="dogName" 
                    name="dogName" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dogName}
                />
                {formik.touched.dogName && formik.errors.dogName ? <div>{formik.errors.dogName}</div>:null}

                <label htmlFor="email">Owner's Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}

                <label htmlFor="password">Password:</label>
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

            <Footer/>
        </>
    )
}

export default Login