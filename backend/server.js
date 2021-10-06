const app = require('./index.js') ;
const connectDB = require('./config/database.js'); 
const dotenv = require('dotenv') ;

dotenv.config({path: 'backend/config/config.env'}) ;

connectDB() ;

app.listen(process.env.PORT , () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} node.`) ;
})