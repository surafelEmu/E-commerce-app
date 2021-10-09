const express = require('express') ;
const userController = require('../controllers/userController') ;
const router = express.Router() ;
const middlewares = require('../middlewares/auth') ;

router.route('/register').post(userController.createUser) ;
router.route('/signin').post(userController.loginUser) ;
router.route('/logout').get(userController.logout) ;
router.route('/password/forget').post(userController.forgotPassword) ;
router.route('/me').get(middlewares.isAuthUser , userController.getUserProfile) ;
router.route('/password/update').put(middlewares.isAuthUser , userController.updatePassword) ;
router.route('/profile/update').put(middlewares.isAuthUser , userController.updateProfile) ;
router.route('/admin/users').get(middlewares.isAuthUser , middlewares.authorizeRole('admin'), userController.allUsers) ;
router.route('/admin/user/:id').get(middlewares.isAuthUser , middlewares.authorizeRole('admin') , userController.getUserDetail) 
                               .put(middlewares.isAuthUser , middlewares.authorizeRole('admin') , userController.updateUser) 
                               .delete(middlewares.isAuthUser , middlewares.authorizeRole('admin') , userController.deleteUser) ;

                                

module.exports = router ;