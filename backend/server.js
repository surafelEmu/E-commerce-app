const app = require('./index.js') ;
const connectDB = require('./config/database.js'); 
const dotenv = require('dotenv') ;

process.on('uncaughtException' , err => {
    console.log(`ERROR ${err.stack}`) ;
    console.log('Shutting down due to uncought exception') ;
    process.exit(1) ;
})

dotenv.config({path: 'backend/config/config.env'}) ;

connectDB() ;

const server = app.listen(process.env.PORT , () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} node.`) ;
}) ;

//Handle unhandled promise rejections
process.on('unhandledRejection' , err => {
    console.log(`ERROR: ${err.message}`  ) ;
    console.log('shutting down the server due to unhandled promise rejcetion') ;
    server.close( () => {
        process.exit(1) ;
    })
})