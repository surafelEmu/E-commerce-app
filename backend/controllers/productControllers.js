const Product = require('../models/productModel.js') ;


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