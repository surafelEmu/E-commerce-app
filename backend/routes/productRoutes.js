const express = require('express')
const productController = require('../controllers/productControllers') ;

const router = express.Router() ;



router.route('/products' ).get(productController.getProducts) ;

module.exports = router ;