const app = require('./index.js') ;
const connectDB = require('./config/database.js'); 
const dotenv = require('dotenv') ;

const cloudinary = require('cloudinary')
process.on('uncaughtException' , err => {
    console.log(`ERROR ${err.stack}`) ;
    console.log('Shutting down due to uncought exception') ;
    process.exit(1) ;
})

dotenv.config({path: 'backend/config/config.env'}) ;



connectDB() ;
console.log(process.env.API_KEY) ;

cloudinary.config({
    cloud_name: "dwhhinizd",
    api_key: "674987133247339" ,
    api_secret: "XIi5j8iHlGkijALvTBKPzhXpM4U"
})


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