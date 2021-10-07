const express = require('express')
const productController = require('../controllers/productControllers') ;
const restrict = require('../middlewares/auth')
const router = express.Router() ;



router.route('/products' ).get(restrict.isAuthUser , restrict.authorizeRole('admin'),productController.getProducts) ;
router.route('/admin/products/new' ).post(restrict.isAuthUser ,productController.createProduct) ;
router.route('/product/:id').get(productController.getSingleProduct) ;
router.route('/admin/product/:id').put(productController.updateProduct)
                                  .delete(productController.deleteProduct) ;

module.exports = router ;