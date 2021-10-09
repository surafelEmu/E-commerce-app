const Order = require('../models/orderModel') ;
const Product = require('../models/productModel') ;

const ErrorHandler = require('../utils/errorHandler') ;
const catchAsync  = require('../middlewares/catchAsync') ;

exports.newOrder = catchAsync( async (req , res , next) => {
    const {
        orderItems ,
        shippingInfo ,
        itemsPrice ,
        taxPrice ,
        shippingPrice ,
        totalPrice ,
        paymentInfo
    } = req.body ;

    const order = await Order.create({
        orderItems ,
        shippingInfo ,
        itemsPrice ,
        taxPrice ,
        shippingPrice ,
        totalPrice ,
        paymentInfo ,
        paidAt: Date.now() ,
        user: req.user.id
    }) ;

    res.status(200).json({
        success: true ,
        order
    })
})