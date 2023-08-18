const express = require('express')
const router = express.Router()
const webhookController = require('../controllers/webhookController')

router.route('/stripe')
  .post(webhookController.stripeWebhook)

module.exports = router