const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route('/createCheckoutSession')
  .post(paymentController.createCheckoutSession)
router.route('/createCustomerPortalSession')
  .post(paymentController.createCustomerPortalSession)

module.exports = router