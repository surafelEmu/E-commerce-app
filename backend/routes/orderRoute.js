const express = require('express') ;

const router = express.Router() ;

const orderController = require('../controllers/orderController') ;
const auth = require('../middlewares/auth') ;

router.route('/order/new').post(auth.isAuthUser , auth.authorizeRole('user') , orderController.newOrder) ;
router.route('/order/:id').get(auth.isAuthUser , orderController.getSingleOrder) ;  
router.route('/orders/me').get(auth.isAuthUser , orderController.getLoggedInUserOrders) ;

module.exports = router ;