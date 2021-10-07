const User = require('../models/userModel') ;
const catchAsync = require('../middlewares/catchAsync') ;



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

    res.status(201).json({
        status: true ,
        user

    })
}) ;