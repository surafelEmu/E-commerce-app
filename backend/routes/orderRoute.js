const express = require('express') ;

const router = express.Router() ;

const orderController = require('../controllers/orderController') ;
const auth = require('../middlewares/auth') ;

router.route('/order').post(auth.isAuthUser , auth.authorizeRole('user') , orderController.newOrder) ;

module.exports = router ;