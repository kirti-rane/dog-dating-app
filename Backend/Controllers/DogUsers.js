const userDogValidate = require('../Validations/signUpVal')
const multer = require('multer');
const upload = require('../Middleware/multerConfig')
const DogProfileSchema = require('../Models/DogProfileSchema')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const saltRound = 10

const addUsers = async (request, response)=>{

    console.log("andr ghus gya")
    console.log(request.body)
    console.log(request.file)

    try{

        const error = userDogValidate.validate(request.body)
        const profilePhoto = request.file ? request.file.filename : null; // Get the filename of the uploaded photo
        console.log(profilePhoto)
        const dogName = request.body.dogName
        console.log(dogName)
        const email = request.body.email
        console.log(email)
        const gender = request.body.gender
        console.log(gender)
        const age = request.body.age
        console.log(age)
        const breed = request.body.breed
        console.log(breed)
        let password = request.body.password
        console.log(password)
        
        const profilePhotoFile = request.file ? request.file.filename : null;  // Get the file name
        console.log(profilePhotoFile)

        if(error.error){

            return response.status(StatusCodes.BAD_REQUEST).json({StatusCodes: StatusCodes.BAD_REQUEST, message:error.error.message})
        }

       
        let salt = await bcrypt.genSalt(saltRound)
        console.log(salt)
       
        let hashedPassword = await bcrypt.hash(password,salt)
        console.log(hashedPassword, "hashedPassword")
        password = hashedPassword

        const fetchUser = await DogProfileSchema.findOne({

            where:{
                ownerEmail: request.body.email,
                dogName: request.body.dogName
            }

        })

        if(fetchUser){
            console.log("this find one is the problemmm!!!!")
            return response.status(StatusCodes.CONFLICT).json({StatusCodes: StatusCodes.CONFLICT, message: "The User already Exits!!"})
        }

        let dogUser = await DogProfileSchema.create({

            dogName : request.body.dogName,
            ownerEmail : request.body.email,
            age : request.body.age,
            gender : request.body.gender,
            breed : request.body.breed,
            profilePhoto : request.file.filename,
            password : password

        })

        if(dogUser){

            console.log("This is the problem!!!!!!!!!!")
            return response.status(StatusCodes.CREATED).json({StatusCodes: StatusCodes.CREATED, Message: "User Created successfully"})
        }else{

            throw("user not created!!")
        }


    }catch(err){
        console.log(err)
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message })
    }
}

module.exports ={addUsers}