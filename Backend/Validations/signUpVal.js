const joi = require('joi')

const userDogValidate = joi.object({

    dogName: joi.string().required("Dog name is compulsory"),
    email: joi.string().email().required("email is compulsory"),
    gender: joi.string().required("Dog name is compulsory"),
    age: joi.number().positive("Age should be positive"),
    breed: joi.string().required("Dog name is compulsory"),
    password: joi.string().min(6).required("password is required"),
    confirmPassword: joi.any().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
      }),
})

module.exports = userDogValidate