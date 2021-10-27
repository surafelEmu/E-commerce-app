const ErrorHandler = require('../utils/errorHandler.js') ;


exports.handleErrors = (err , req ,res , next) => {

    let message , statusCode ;
    if(err) {
        if(!err.statusCode) statusCode = 500 ;
        if(!err.message) message = err ;
    }

    statusCode = err.statusCode || 500 ;
    message = err.message || "Internal Server Error" ;

    console.log('reading from error')
    //console.log( err) ;

    if(process.env.NODE_ENV == 'DEVELOPEMENT') {
        res.status(statusCode).json({
            success: false ,
            error: err ,
            errMessage: message ,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV == 'PRODUCTION') {
        let error = {...err}

        error.message = err.message ;
        if(err.name == 'CastError') {
            const message =  `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message , 400)
        }

        if(err.name == 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message) ;
            error = new ErrorHandler(message , 400)
        }

        // wrong mongoose object Id error
        res.status(statusCode).json({
            success: false ,
            message: message || 'Internal Server Error'
        })
    }

}