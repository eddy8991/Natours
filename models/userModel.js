const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'A name is required for signup']
        },
        email:{
            type: String,
            required:[true, 'An email is required'],
            lowercase:true,
            unique:true,
            validate:[validator.isEmail]
        },
        password:{
            required:[true,'A password is required for signup'],
            type:String,
            minLength:8,
            select:false
        },
        passwordConfirm:{
            type:String,
            required:true,
            validate:{
                validator: function(el){
                    return el === this.password;
                }
            },
            message:'Passwords are different'
        },
        photo:String
    }
)

userSchema.pre ('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema)
module.exports = User