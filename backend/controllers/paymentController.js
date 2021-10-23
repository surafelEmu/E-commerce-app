const catchAsync = require('../middlewares/catchAsync') ;

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY) ;

// Process stripe payment => /api/v1/payment/process

exports.processPayment = catchAsync( async (req , res , next) => {
    const paymentIntent  = await stripe.paymentIntent.create({
        amount: req.body.amount ,
        currency: 'usd' ,

        metadata: {integration_check: 'accept_a_payment'}
    }) ;

    res.status(200).json({
        success: true ,
        client_Secret: paymentIntent.client_Secret
    })
})


// Send stripe api key =>  /api/v1/stripeapi

exports.sendApiKey = catchAsync(  (req , res , next) => {
    
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLIC_KEY ,
         
    })
})