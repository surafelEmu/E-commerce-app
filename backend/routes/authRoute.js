const express = require('express') ;
const userController = require('../controllers/userController') ;
const router = express.Router() ;

router.route('/register').post(userController.createUser) ;
router.route('/signin').post(userController.loginUser) ;
router.route('/logout').get(userController.logout) ;
module.exports = router ;