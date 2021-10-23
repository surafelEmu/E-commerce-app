const express = require('express') ;

const router = express.Router() ;

const paymentController = require('../controllers/paymentController') ;
const auth = require('../middlewares/auth') ;

router.route('/payment/process').post(auth.isAuthUser , paymentController.processPayment) ;
router.route('/stripeapi').get(
    //auth.isAuthUser ,
     paymentController.sendApiKey) ;

module.exports = router ;