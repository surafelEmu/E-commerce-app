const express = require('express') ;
const bodyParser = require('body-parser') ;
const {handleErrors} = require('./middlewares/error') ;
const auth = require('./routes/auth.js') ;

const app = express() ;

const productRoute = require('./routes/productRoutes') ;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/api/v1' , productRoute) ;
app.use('/api/v1' , auth) ;


app.use(handleErrors) ;


module.exports = app ;