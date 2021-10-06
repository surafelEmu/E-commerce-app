const express = require('express') ;
const bodyParser = require('body-parser') ;

const app = express() ;

const productRoute = require('./routes/productRoutes') ;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use('/api/v1' , productRoute) ;

module.exports = app ;