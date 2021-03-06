const express = require('express') ;
const bodyParser = require('body-parser') ;
const {handleErrors} = require('./middlewares/error') ;
const auth = require('./routes/authRoute.js') ;
const order = require('./routes/orderRoute') ;
const payment = require('./routes/paymentRoute')

const cookieParsor = require('cookie-parser') ;


const fileUpload = require('express-fileupload')


const app = express() ;

const productRoute = require('./routes/productRoutes') ;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParsor())
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(fileUpload()) ;

//Setting up cloudinary config
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME ,
//     api_key: process.env.API_KEY ,
//     api_secret: process.env.API_SECREAT
// })

app.use('/api/v1' , productRoute) ;
app.use('/api/v1' , auth) ;
app.use('/api/v1' , order) ;
app.use('/api/v1' , payment) ;

app.use(handleErrors) ;


module.exports = app ;