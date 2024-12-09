import Navbar from "./Navbar"
import ProfilePhoto from "./ProfilePhoto"
import './signUp.css'
import { useFormik } from "formik"
import * as Yup from "yup"
import React, { useState } from "react";
import axios from "axios"

function SignUp() {

    const [profilePhoto, setProfilePhoto] = useState(null);

    const formik = useFormik({

        initialValues: {
            dogName: "",
            email: "",
            age: "",
            gender: "",
            breed: "",
            password: "",
            confirmPassword: "",
            ProfilePhoto: null

        },
        validationSchema: Yup.object({

            dogName: Yup.string().required("This field is required"),
            email: Yup.string().required("this field required"),
            age: Yup.number().positive("Age should be positive").integer("Age should be an integer").required("This field is required"),
            gender: Yup.string()
                .oneOf(['Male', 'Female'], 'Gender must be either Male or Female') // Ensures the value is one of the two
                .required('Gender is required'),
            breed: Yup.string().required("this field is required"),
            password: Yup.string().min(6).required("This field is required"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')

        }),

        onSubmit: async (values) => {

            console.log(values)
            console.log(values.ProfilePhoto)

            // Append individual fields from `values`
        
            try{
                const payload ={

                    dogName:values.dogName,
                    email: values.email,
                    age: values.age,
                    gender: values.gender,
                    breed:values.breed,
                    password:values.password,
                    confirmPassword:values.confirmPassword,
                    profilePhoto:values.ProfilePhoto
                }

    
                 console.log(payload)
                const response = await axios.post('http://localhost:4000/dogUser/signUp', payload,{
                    
                    headers: { 
                        'Content-Type': 'multipart/form-data' 
                    }
                }
                );
                console.log('Response:', response);

            }catch(err){

                console.log("Error while creating the account!!")
                console.log(err)
            }

            
        }

    })

    function onPhotoChange(file) {

        formik.setFieldValue("ProfilePhoto", file)
        console.log(file)
    }
    return (
        <>
            <Navbar />
            <form onSubmit={formik.handleSubmit}>

                <ProfilePhoto onPhotoChange={onPhotoChange} profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />

                <label for="dogName">Dog Name:</label>
                <input
                    type="text"
                    id="dogName"
                    name="dogName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dogName}
                />

                {formik.touched.dogName && formik.errors.dogName ? <div className="error_msg">{formik.errors.dogName}</div> : null}

                <label for="email">Owner's Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div className="error_msg">{formik.errors.email}</div> : null}

                <label for="gender">Dog's Gender:</label>
                <div className="radio-style">

                    Male:<label><input
                        type="radio"
                        id="gender-male"
                        name="gender"
                        value="Male"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.gender === "Male"}
                    />
                    </label>

                    <div>
                        Female:<label><input
                            type="radio"
                            id="gender-female"
                            name="gender"
                            value="Female"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.gender === "Female"}
                        />
                        </label>
                    </div>
                </div>
                {formik.touched.gender && formik.errors.gender ? <div className="error_msg">{formik.errors.gender}</div> : null}
                <label for="age">Dog's Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age} />
                {formik.touched.age && formik.errors.age ? <div className="error_msg">{formik.errors.age}</div> : null}

                <label for="breed">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.breed} />

                {formik.touched.breed && formik.errors.breed ? <div className="error_msg">{formik.errors.breed}</div> : null}


                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? <div className="error_msg">{formik.errors.password}</div> : null}


                <label for="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword} />

                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="error_msg">{formik.errors.confirmPassword}</div> : null}


                <button type="submit">Submit</button>
            </form>

        </>
    )
}

export default SignUp