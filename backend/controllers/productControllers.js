const Product = require('../models/productModel.js') ;
const ErrorHandler = require('../utils/errorHandler.js');
const catchAsync = require('../middlewares/catchAsync')
const APIFeatures = require('../utils/apiFeatures') ;
const { handleErrors } = require('../middlewares/error.js');
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

        //return next(new ErrorHandler('my error' , 500))
        const resPerPage = 8 ;

        const apiFeatures = new APIFeatures(Product.find() , req.query).search()
        .filter() 
        .pagination(resPerPage)



        const products = await apiFeatures.query ;
    

        res.status(200)
        .json({
            success: true ,
            productCount: products.length ,
            products
        })
       
  
  
})

exports.createProduct = catchAsync(  async(req , res , next) => {
    const reqBody = req.body ;
        req.body.user = req.user.id ;
        // req.body.reviews = {
        //     rating: 0.0 ,
        //     comment: 'yet to be seen' ,
        //     user:  req.body.user ,

        // } ;
        const product = await Product.create(req.body) ;
        console.log(req.body) ;

        
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


exports.createProductReview = catchAsync(async (req , res ,next) => {
    const {rating , comment , productId} = req.body ;

    const review = {
        user: req.user._id ,
        name: req.user.name ,
        rating: Number(rating) ,
        comment
    } 

    const product = await Product.findById(productId) ;

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    ) ;

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment ;
                review.rating = rating ;
            }
        })
    } else{
        product.reviews.push(review) ;
        product.numofReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc , item) => item.rating + acc , 0  ) / product.reviews.length ;

    await product.save({ validateBeforeSave: false}) ;

    res.status(200).json({
        success: true
    })
})

exports.getAllReviews = catchAsync(async (req ,res, next) => {
    const {reviews} = await Product.findById(req.params.id) ;

    if(!reviews) return next(handleErrors('no review yet' , 404)) ;

    //console.log(reviews) ;

    res.status(200).json({
        success: true ,
        reviews
    })
})


// admin delete review 

exports.deleteReview = catchAsync(async (req ,res ,next) => {
    const product = await Product.findById(req.query.productId); 

    console.log(product) ;
    const reviews = product.reviews.filter(review => review._id.toString() != req.query.id.toString()) ;

    const numofReveiws = reviews.length ;

    const ratings = product.reviews.reduce((acc , item) => item.rating + acc, 0)/ reviews.length ;

    await Product.findByIdAndUpdate(req.query.productId , {
        reviews ,
        ratings ,
        numofReveiws
    } ,{
        new: true ,
        runValidators: true ,
        useFindAndModify: false
    }) ;

    res.status(200).json({
        success: true ,
        ratings

    })
})