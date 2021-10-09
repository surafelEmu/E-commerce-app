const express = require('express') ;

const router = express.Router() ;

const orderController = require('../controllers/orderController') ;
const auth = require('../middlewares/auth') ;

router.route('/order/new').post(auth.isAuthUser , orderController.newOrder) ;
router.route('/order/:id').get(auth.isAuthUser , orderController.getSingleOrder) ;  
router.route('/orders/me').get(auth.isAuthUser , orderController.getLoggedInUserOrders) ;

router.route('/admin/orders').get(auth.isAuthUser , auth.authorizeRole('admin') , orderController.getAllOrders) ;
router.route('/admin/order/:id').put(auth.isAuthUser , auth.authorizeRole('admin') , orderController.processOrder)
                                .delete(auth.isAuthUser , auth.authorizeRole('admin') , orderController.deleteOrder) ;

module.exports = router ;