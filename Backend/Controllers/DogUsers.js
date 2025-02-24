const userDogValidate = require('../Validations/signUpVal')
const multer = require('multer');
const upload = require('../Middleware/multerConfig')
const DogProfileSchema = require('../Models/DogProfileSchema')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { profile } = require('console');
const { all } = require('../Routes/DogUsers');


const saltRound = 10

const addUsers = async (request, response) => {

    console.log("andr ghus gya")
    console.log(request.body)
    console.log(request.file)

    try {

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

        if (error.error) {

            return response.status(StatusCodes.BAD_REQUEST).json({ StatusCodes: StatusCodes.BAD_REQUEST, message: error.error.message })
        }


        let salt = await bcrypt.genSalt(saltRound)
        console.log(salt)

        let hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword, "hashedPassword")
        password = hashedPassword

        const fetchUser = await DogProfileSchema.findOne({

            where: {
                ownerEmail: request.body.email,
                dogName: request.body.dogName
            }

        })

        if (fetchUser) {
            console.log("this find one is the problemmm!!!!")
            return response.status(StatusCodes.CONFLICT).json({ StatusCodes: StatusCodes.CONFLICT, message: "The User already Exits!!" })
        }

        let dogUser = await DogProfileSchema.create({

            dogName: request.body.dogName,
            ownerEmail: request.body.email,
            age: request.body.age,
            gender: request.body.gender,
            breed: request.body.breed,
            profilePhoto: request.file.filename,
            password: password

        })

        if (dogUser) {

            console.log("This is the problem!!!!!!!!!!")
            return response.status(StatusCodes.CREATED).json({ StatusCodes: StatusCodes.CREATED, Message: "User Created successfully" })
        } else {

            throw ("user not created!!")
        }


    } catch (err) {
        console.log(err)
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message })
    }
}



const getUserDetails = async (request, response) => {

    console.log("In the getUserDetails block")
    console.log(request.body)

    try {

        let dogProfile = await DogProfileSchema.findOne({
            where: {

                [Op.and]: [
                    {
                        dogName: request.body.dogName,
                        ownerEmail: request.body.email
                    }
                ]
            }
        })

        // console.log(dogProfile.dataValues)

        if (dogProfile) {

            const fetchedPassword = dogProfile.dataValues.password

            let match = await bcrypt.compare(request.body.password,fetchedPassword)

            console.log(fetchedPassword)

            const userDetails = {

                dogName: request.body.dogName,
                ownerEmail: request.body.email,
                age : dogProfile.dataValues.age,
                gender: dogProfile.dataValues.gender,
                breed: dogProfile.dataValues.breed

            }

            //for production use(when code will not run on localhost)
            const photoUrl =  `${request.protocol}://${request.get('host')}/uploads/${dogProfile.profilePhoto}`
            console.log(photoUrl)

            if(!match){

                return response.status(StatusCodes.UNAUTHORIZED).json(
                    {
                        statusCode: StatusCodes.UNAUTHORIZED,
                        message:"Login Unsuccessful!!"
                    }
                )
            }


            //console.log(request)

            return response.status(StatusCodes.OK).json(
                { 
                    statusCode: StatusCodes.OK,
                     message: "User Found!!",
                     userDetails,
                     photoUrl
                 })
        }

        return response.status(StatusCodes.NOT_FOUND).json({ statusCode: StatusCodes.NOT_FOUND, message: " User Not Found!!" })


    } catch (err) {

        console.log(err.message)

    }
}

const getAllUsers = async(request, response)=>{

    try{

        // console.log(request.body.dogName)

        const { limit, offset, dogName, ownerEmail} = request.query;

        console.log(request.query)
        let allUsers = await DogProfileSchema.findAll({
            attributes: ['dogName', 'age', 'gender', 'breed','profilePhoto'],
            limit: parseInt(limit),
            offset: parseInt(offset),
            where: {

                [Op.not]: [
                    {
                        dogName: dogName,
                        ownerEmail: ownerEmail
                    }
                ]
            }
          })
    

        // console.log(allUsers)
        // allUsers.forEach(user => {

        //     allUserRecord = console.log(`Dog Name: ${user.dogName}, Age: ${user.age}, Owners Email: ${user.ownerEmail}`);
        // });

        //console.log(allUsers.DogProfile)

        allUsers = allUsers.map(user => ({
            ...user.toJSON(), // Convert Sequelize model instance to a plain object
            profilePhotoUrl: `${request.protocol}://${request.get('host')}/uploads/${user.profilePhoto}`
        }));

        console.log("hiii we are after the call...")
        console.log(allUsers)
        
        return response.status(StatusCodes.OK).json(
            { 
                statusCode: StatusCodes.OK,
                 message: "User data fetched..",
                 allUsers
             })

    }catch(error){

        console.log(error.message)

        return response.status(StatusCodes.BAD_GATEWAY).json(
            {
                statusCode: StatusCodes.BAD_GATEWAY,
                message: "Failed to fetch all users!"
            }
        )
    }


}

module.exports = { addUsers, getUserDetails, getAllUsers}