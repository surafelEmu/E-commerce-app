const express = require('express') ;

const productRoute = require('./routes/productRoutes') ;



const app = express() ;

app.use('/api/v1' , productRoute) ;

module.exports = app ;