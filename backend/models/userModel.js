const mongoose = require('mongoose') ;
const validator = require('validator') ;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') ;

const userSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: [true , 'Please provide your name'] ,
        maxLenght: [30 ,'a user name cannot exceed 100 characters']
    } ,
    email: {
        type: String ,
        required: [true , 'Please provide your email address'] ,
        unique: true ,
        validate: [validator.isEmail , 'Please enter a valid email address']        
    }  ,
    password: {
        type: String ,
        required: [true , 'Please enter your password'] ,
        minlength: [6, 'Your password must be longer than 6 characters'] ,
        select: false
    } , 
    avator: {
        public_id: {
            type: String ,
            required: true 
        } ,
        url: {
            type: String ,
            required: true 
        }
    } ,
    role: {
        type: String ,
        default: 'user'
    },
    createdAt: {
        type: Date ,
        default: Date.now
    } ,
    resetPasswordToken: String ,
    resetPasswordExpire: Date
   

}) ;


//Encryptin password before saving 
userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) {
        next()
    } 
    this.password = await bcrypt.hash(this.password , 10) ;
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password) ;
}

// return  jwt token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id } , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRES_TIME
    }) ; 
}


const user = mongoose.model('user' , userSchema) ;

module.exports = user ; 