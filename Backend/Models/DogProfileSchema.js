const Datatype = require('sequelize')
const db = require('../Util/database') //sequelize instance


const dogProfileSchema = db.define('DogProfile',{

    dogName: {
        type: Datatype.STRING,
        allowNull: false,
    },
    ownerEmail:{

        type: Datatype.STRING,
        allowNull:false

    },
    age: {
        type: Datatype.INTEGER,
        allowNull: false,
    },
    gender: {
        type: Datatype.ENUM('Male', 'Female'),
        allowNull: false,
    },
    breed: {
        type: Datatype.STRING,
        allowNull: false,
    },
    profilePhoto: {
        type: Datatype.STRING,  // Store the image as a binary large object (BLOB)
        allowNull: true,  // This can be set to false if the image is required
    },
    password:{  
        type: Datatype.STRING,
        allowNull:false
    }
}
)

module.exports = dogProfileSchema