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
}) ;

//get a single order 

exports.getSingleOrder = catchAsync( async (req ,res , next) => {
    const order = await Order.findById(req.params.id).populate('user' , 'name email') ;

    if(!order) {
        return next(new ErrorHandler('No order found with this id' , 404)) ;
    }

    res.status(200).json({
        success: true ,
        order 
    })
}) ;

//get logged in user orders => /api/v1/orders/me

exports.getLoggedInUserOrders = catchAsync(async (req  ,res , next) => {
    const orders = await Order.find({user: req.user.id}) ;

    res.status(200).json({
        success: true ,
        orders
    })
})