const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'A name is required for signup']
        },
        email:{
            type:String,
            required:[true, 'An email is required'],
            lowercase:true,
            unique:true,
            validate:[validator.isEmail]
        },
        password:{
            required:[true,'A password is required for signup'],
            type:String,
            minLength:8
        },
        passwrdConfirm:{
            type:String,
            required:true
        },
        photo:String
    }
)

const User = mogoose.model('User', userSchema)
module.exports = User