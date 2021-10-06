const express = require('express')
const productController = require('../controllers/productControllers') ;

const router = express.Router() ;



router.route('/products' ).get(productController.getProducts) ;
router.route('/products/new' ).post(productController.createProduct) ;


module.exports = router ;