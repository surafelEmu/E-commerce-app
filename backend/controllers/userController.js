const User = require('../models/userModel') ;
const catchAsync = require('../middlewares/catchAsync') ;
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken') ;


exports.createUser = catchAsync(async (req , res , next) => {

    const {name , email , password} = req.body ;
    const user = await User.create({
        name ,
        email ,
        password ,
        avator: {
            public_id: 'Benedict_Cumberbatch_2011' ,
            url: 'https://res.cloudinary.com/demo/image/upload/remote_media/commons/7/75/Benedict_Cumberbatch_2011.jpg'
        }
    }) ;

    const token = user.getJwtToken() ;

    sendToken(user , 200 , res) ;
}) ;


exports.loginUser = catchAsync( async (req , res , next) => {
    const {email , password} = req.body ;

     const user = await User.findOne({email}).select('+password') ;

     if(!user) {
         return next(new ErrorHandler('Invalid Email or password' , 401)) ;
     }
     console.log(email) ;

     const isPasswordMatched = await user.comparePassword(password) ;

     if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or password') , 401) ;

     }
     const token = user.getJwtToken() ;

     sendToken(user , 200 , res) ;


})

exports.logout = catchAsync( async (req , res , next) => {
    res.cookie('token' , null , {
        expires: new Date(Date.now()) ,
        httpOnly: true 
    })

    res.status(200).json({
        success: true ,
        message: 'Logged out'
    })
})