const Product = require('../models/productModel.js') ;
const ErrorHandler = require('../utils/errorHandler.js');
const catchAsync = require('../middlewares/catchAsync')
const APIFeatures = require('../utils/apiFeatures') ;
exports.getSingleProduct =  catchAsync(  async(req , res, next) => {
   
        const product = await Product.findById(req.params.id) ;

        if(!product) return next(new ErrorHandler('Product not found' , 404)) ;


        res.status(200)
        .json({
            message: 'Successfuly got products' ,
            product
        })
       
  
  
})

exports.getProducts = catchAsync( async(req , res ,next) => {

        const resPerPage = 1 ;

        const apiFeatures = new APIFeatures(Product.find() , req.query).search()
        .filter() 
        .pagination(resPerPage)



        const products = await apiFeatures.query ;
    

        res.status(200)
        .json({
            message: 'Successfuly got products' ,
            products
        })
       
  
  
})

exports.createProduct = catchAsync(  async(req , res , next) => {
    const reqBody = req.body ;
        req.body.user = req.user.id ;
        const product = await Product.create(req.body) ;
        console.log('This is req body:' + req.body) ;

        
        res.status(201).json({
            
            message: "Product Successfully added" ,
            product
        })
    
} )

exports.updateProduct = catchAsync(  async (req , res , next) => {
    
        const product = await Product.findByIdAndUpdate(req.params.id , req.body ,{
            new: true ,
            runValidators: true ,
            useFindAndModify: false
        }) ;

        res.status(201)
            .json({
                newProduct: product
            })
    

   



})



exports.deleteProduct = catchAsync(  async (req , res , next) => {
  
        const product = await Product.findById(req.params.id) ;

        if(!product) {
            
            return  next(new ErrorHandler("Product not found..." , 404)) ;
               
        }

        await product.remove()

        res.status(201)
            .json({
                message: 'product removed successfully'
            })


  



} )