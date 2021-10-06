const express = require('express')
const productController = require('../controllers/productControllers') ;

const router = express.Router() ;



router.route('/products' ).get(productController.getProducts) ;
router.route('/admin/products/new' ).post(productController.createProduct) ;
router.route('/product/:id').get(productController.getSingleProduct) ;
router.route('/admin/product/:id').put(productController.updateProduct)
                                  .delete(productController.deleteProduct) ;

module.exports = router ;