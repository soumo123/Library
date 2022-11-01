const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModels')
const sendToken = require('../utils/jwtToke')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
//user registration//

exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, username,phone,password } = req.body
    const user = await User.create({
        name, email,username,phone, password
    })
    sendToken(user, 200, res)
})


//Login User//

exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    //if email and password not putting//
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {

        return next(new ErrorHandler('Invalid email and password', 401))
    }

    const isPasswordMatch = await user.comparePassword(password);
  
    
    if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid email and password', 401))
       
        
    }
   
    sendToken(user,200,res)
 
})

//logout user// 

exports.logout = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure:false,
        maxAge: 1000 * 60 * 1000,
        sameSite: 'lax', 
        path:"/",
    })

    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })

})



//get user details////

exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    
    const user = await User.findById(req.user.id)

     res.status(200).json({
        success: true,
        user
    })
})

//update user password////




//get all users by admin//

exports.getSingleUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exits ${req.params.id} this Id`, 400))
    }
    res.status(200).json({
        success: true,
        user
    })
})


