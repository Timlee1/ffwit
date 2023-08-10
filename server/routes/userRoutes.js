const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')


//public routes
router.route('/signup')
  .post(userController.createUser)
router.route('/verify/:token')
  .get(userController.verifyUser)
router.route('/forgotPassword')
  .post(userController.forgotPassword)
router.route('/resetPassword')
  .post(userController.resetPassword)

router.use(verifyJWT)

//private routes
router.route('/')
  .get(userController.getAllUsers)
  .patch(userController.updatePassword)
  .delete(userController.deleteUser)

module.exports = router