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
    console.log(req.user) ;
    const orders = await Order.find({user: req.user.id}) ;

    console.log("This are orders") 
    console.log(orders) ;
    res.status(200).json({
        success: true ,
        orders
    })
}) ;


//get all orders by the admin

exports.getAllOrders = catchAsync(async (req ,res ,next) => {
    const orders = await Order.find().populate('user' , 'name email') ;

    res.status(200).json({

        success: true ,
        amount: orders.length ,
        orders
    })
}) ;


//admin process an order 

exports.processOrder = catchAsync( async(req ,res ,next) => {
    const order = await Order.findById(req.params.id) ;

    if(order.orderStatus == 'Delivered') 
        return next(new ErrorHandler('You have already delivered this order' , 400))

    order.orderItems.forEach(async item => {
        await updateStock(item.product , item.quantity)
    })

    order.orderStatus = req.body.status ,
    order.deliveredAt = Date.now() ;

    await order.save() ;

    res.status(200).json({
        success: true ,
        order
    })

}) ;

async function updateStock(id , quantity) {
    const product = await Product.findById(id) ;

    product.stock = product.stock - quantity ;

    await product.save() ;
}


//delete order by admin

exports.deleteOrder = catchAsync(async (req ,res ,next ) => {
    const order = await Order.findById(req.params.id) ;

    if(!order) return next(ErrorHandler('Order with id: ' + req.params.id + "is not found" , 404)) ;

    order.remove() ;

    res.status(200).json({
        success: true 
    })
})