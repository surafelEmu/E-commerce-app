const catchAsync = require('../middlewares/catchAsync') ;

const Stripe = require('stripe')
const stripe = Stripe(`sk_test_51JnofII5y98aKyYmjWPrHIsQJttZLDqiMVe0ULVuJsAMwBfnEx1QxEXm1hceMpxLAfeSo3UtAjcQQ7wFdTlDW50600RYG4nz2A`) ;

// Process stripe payment => /api/v1/payment/process

exports.processPayment = catchAsync( async (req , res , next) => {

    console.log(process.env.STRIPE_PRIVATE_KEY)
    //console.log(stripe.paymentIntents) ;
    const paymentIntent  = await stripe.paymentIntents.create({
        amount: req.body.amount ,
        currency: 'usd' ,

        metadata: {integration_check: 'accept_a_payment'}
    }) ;

    

    res.status(200).json({
        success: true ,
        client_Secret: paymentIntent.client_secret
    })
})


// Send stripe api key =>  /api/v1/stripeapi

exports.sendApiKey = catchAsync(  (req , res , next) => {
    
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLIC_KEY ,
         
    })
})