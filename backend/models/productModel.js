const mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: [true , 'Please provide a product name'] ,
        trim: true , // the remove any space between string
        maxLenght: [100 ,'product name cannot exceed 100 characters']
    } ,
    price: {
        type: Number ,
        required: [true , 'Please provide a product price'] ,
        
        maxLenght: [5 ,'product name cannot exceed 100 characters']
    } ,
    // description: {
    //     type: String ,
    //     required: [true , 'Please provide a product description'] ,

    // } ,
    // ratings: {
    //     type: Number ,
    //     default: 0 
    // } ,
    // images: [
    //     {
    //         public_id: {
    //             type: String ,
    //             required: true 
    //         } ,
    //         url: {
    //             type: String ,
    //             required: true
    //         }
    //     }
    // ] ,
    // catagory: {
    //     type: String ,
    //     required: [true , 'Please select your product catagory'] ,
    //     enum: {
    //         values: [
    //             'Electronics' ,
    //             'Cameras' ,
    //             'Laptop' ,
    //             'Accessories' ,
    //             'Headphones' ,
    //             'Food' ,
    //             'Books' ,
    //             'Clothes/Shoes' ,
    //             'Beauty/Health' ,
    //             'Home'
    //         ] ,
    //         message: 'Please select the correct catagory for your product'
    //     } ,
    //     seller: {
    //         type: String ,
    //         required: [true , 'please enter product seller']
    //     } ,
    //     stock: {
    //         type: Number ,
    //         required: [true , 'Please enter product stock'] ,
    //         maxLength: [5 , 'Product stock can not be more than 5 chars'] ,
    //         default: 0 
    //     } ,
    //     reviews: [
    //         {
    //             name: {
    //                 type: String ,
    //                 required: true 
    //             } ,
    //             comment: {
    //                 type: String ,
    //                 requried: true 
    //             } 
    //         } 
    //     ] ,
    //     createdAt: {
    //         type: Date ,
    //         default: Date.now()
    //     }
    // } ,
    user: {
        type: mongoose.Schema.ObjectId ,
        ref: 'User' ,
        required: true 
    }

}) ;

const products = mongoose.model('products' , productSchema) ;

module.exports = products ;