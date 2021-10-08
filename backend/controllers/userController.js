const User = require('../models/userModel') ;
const catchAsync = require('../middlewares/catchAsync') ;
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken') ;
const Email = require('../utils/sendEmail.js') ;

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
}) ;


// exports.forgotPassword = catchAsync(async (req , res , next) => {

//     const user = await User.findOne({email: req.body.email}) ;

//     if(!user) {
//         return next(new ErrorHandler('user not found with email', 404)) ;
//     }

//     const resetToken = user.getResetPasswordToken() ;

//     await user.save({validateBeforSave: false}) ;

//     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}` ;

//     const message = `Your password reset token is as follow:\n\n${resetUrl}/n/n if you have not requested this email , then ignore it` ;

//     try{

//         await sendEmail({
//             email: user.email ,
//             subject: 'shopShop Password Recovery' ,
//             message: message
//         })

//         res.status(200).json({
//             success: true ,
//             message: `Email sent to: ${user.email}`
//         })

//     } catch(error) {
//         user.resetPasswordToken = undefined ;
//         user.resetPasswordExpires = undefined ;

//         await user.save({validateBeforSave: false}) ;

//         return next(new ErrorHandler(error.message , 500))
//     }

// })



exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new ErrorHandler('There was an error sending the email. Try again later!'),
        500
      );
    }
  });