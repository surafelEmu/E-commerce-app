const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("./catchAsync");
const jwt = require('jsonwebtoken') ;
const User = require('../models/userModel')

exports.isAuthUser = catchAsync(async (req , res , next) => {

    try{
        const { token } = req.cookies ;

        if(!token) return next(new ErrorHandler('LogIn first to access' , 401)) ;
    
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        req.user = await User.findById(decoded.id) ;
    
        next()
    }
    catch(error) {
        console.log(error) ;
    }
    

}) ;

exports.authorizeRole = (...roles) => {
    return (req , res , next) => {
        if(!roles.includes(req.user.role)) 
           return next(new ErrorHandler('You are not allowed to access this resource ' , 403)) ;
        next() ;
    }
} ;
