import "./login.css"
import Navbar from "./Navbar"
import {useFormik} from "formik"
import * as Yup from "yup";

function Login() {

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
        onSubmit:(values)=>{

            //call the backend api using axios lib
            console.log(values)
            formik.resetForm()
            console.log(values)
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