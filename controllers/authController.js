const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')
const jwt = require('jsonwebtoken');


exports.signup = catchAsync(async(req,res,next) => {
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })

    const token = jwt.sign({id:newUser._id}, process.env.JWTSECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    })
});

exports.login =catchAsync(async (req,res,next) => {
    const {email, password} = req.body

    if(!email || !password) {
       return next(new AppError('Authentication failed', 400))
    }

    const user = await User.findOne({email}).select('+password')

    
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Authentication failed', 401))
    }

    const token = ''
    res.status(200).json({
        status:'sucess',
        token 
    })

})