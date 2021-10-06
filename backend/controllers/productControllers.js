const Product = require('../models/productModel.js') ;
const ErrorHandler = require('../utils/errorHandler.js');


exports.getSingleProduct = async(req , res, next) => {
    try{
        const product = await Product.findById(req.params.id) ;

        if(!product) return next(new ErrorHandler('Product not found' , 404)) ;
        res.status(200)
        .json({
            message: 'Successfuly got products' ,
            product
        })
       
    } catch(error) {
        //console.log(error.message) ;
        return next(new ErrorHandler(error.message , error.statusCode)) ;

    }
  
}

exports.getProducts = async(req , res ,next) => {

    try{
        const products = await Product.find() ;

        res.status(200)
        .json({
            message: 'Successfuly got products' ,
            products
        })
       
    } catch(error) {
        return next(new ErrorHandler(error.message , error.statusCode)) ;

    }
  
}

exports.createProduct = async(req , res , next) => {
    const reqBody = req.body ;
    try{
        const product = await Product.create(req.body) ;
        console.log('This is req body:' + req.body) ;

        
        res.status(201).json({
            
            message: "Product Successfully added" ,
            product
        })
    } catch(error) {
        return next(new ErrorHandler(error.message , error.statusCode)) ;
    }
}

exports.updateProduct = async (req , res , next) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id , req.body ,{
            new: true ,
            runValidators: true ,
            useFindAndModify: false
        }) ;

        res.status(201)
            .json({
                newProduct: product
            })
    }

    catch(error) {
        return next(new ErrorHandler(error.message , error.statusCode)) ;
    }



}



exports.deleteProduct = async (req , res , next) => {
    try{
        const product = await Product.findById(req.params.id) ;

        if(!product) {
            
            return  next(new ErrorHandler("Product not found..." , 404)) ;
               
        }

        await product.remove()

        res.status(201)
            .json({
                message: 'product removed successfully'
            })
    }

    catch(error) {
        return next(new ErrorHandler(error.message , error.statusCode)) ;
       
    }



}