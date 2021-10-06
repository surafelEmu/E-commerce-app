const Product = require('../models/productModel.js') ;


exports.getSingleProduct = async(req , res, nex) => {
    try{
        const product = await Product.findById(req.params.id) ;

        res.status(200)
        .json({
            message: 'Successfuly got products' ,
            product
        })
       
    } catch(error) {
        res.json({
            message: error
        })
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
        res.json({
            message: error
        })
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
        res.status(500)
            .json({
                requested: reqBody ,
                message: "some thing went wront product is not added" ,
                ErrorMesage: error
            })
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
        error: error 
    }



}



exports.deleteProduct = async (req , res , next) => {
    try{
        const product = await Product.findById(req.params.id) ;

        if(!product) {
            res.status(404)
                .json({
                    message: "Product not found..."
                })
        }

        await product.remove()

        res.status(201)
            .json({
                message: 'product removed successfully'
            })
    }

    catch(error) {
        ErrorMesage: error 
    }



}