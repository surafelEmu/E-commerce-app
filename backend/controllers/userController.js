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

//Get currently logged in user detail => /api/v1/me

exports.getUserProfile = catchAsync(async (req , res , next) => {
  const user = await User.findById(req.user.id) ;

  res.status(201).json({
    success: true ,
    user
  })
})



//update/ change password


exports.updatePassword = catchAsync( async (req ,res , next) => {
  const user = await User.findById(req.user.id).select('+password') ;

  //check previous user password
  const isMatched = await user.comparePassword(req.body.oldpassword) 

  if (!isMatched) {
    return next(new ErrorHandler('old password is incorrect')) ;
  }

  user.password = req.body.password ;
  await user.save() ;

  sendToken(user, 200 , res) ;
  
}) ;



exports.updateProfile = catchAsync( async (req ,res , next) => {
  const user = await User.findByIdAndUpdate(req.user.id , req.body , {
    new: true ,
    runValidators: true ,
    useFindAndModify: false
  }) ;

  // user.name = req.body.name ;
  //await  user.save() ;

  res.status(201).json({
    success: true ,
    user
  })
  
}) ;


//Admin Routes 

//get All users => /api/v1/admin/users

exports.allUsers = catchAsync(async (req , res , next) => {
  const users = await User.find() ;  
  


  res.status(200).json({
    success: true ,
    users
  })
})

















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

  exports.getUserDetail = catchAsync(async (req , res , next ) => {

    const user = await User.findById(req.params.id) ;

    if(!user) return next(ErrorHandler('user not found with id: ' + req.params.id)) ;

    res.status(200).json({
      success: true ,
      user
    })
  }) ;

  //


//update user profile only admin  => /api/v1/admin/user?:id
exports.updateUser = catchAsync( async (req ,res , next) => {
  const newUserData = {
    name: req.body.name ,
    email: req.body.email ,
    role: req.body.role
  }


  const user = await User.findByIdAndUpdate(req.params.id , newUserData , {
    new: true ,
    runValidators: true ,
    useFindAndModify: false
  }) ;

  // user.name = req.body.name ;
  //await  user.save() ;

  res.status(201).json({
    success: true ,
    user
  })
  
}) ;


//Delete user by admin 

exports.deleteUser = catchAsync(async (req , res , next) => {
  const user = await User.findById(req.params.id) ;

  if(!user) ErrorHandler('User not found with this id' + req.params.id) ;

  await user.remove() ;

  res.status(201).json({
    success: true 
  })
})

