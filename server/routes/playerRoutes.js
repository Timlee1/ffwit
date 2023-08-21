const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)
router.route('/')
  .get(playerController.getPlayers)

module.exports = router