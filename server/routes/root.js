const express = require('express')
const router = express.Router()
const path = require('path')

//regex ^/$|/index(.html)? match if route is / or index or index/html
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
  return res.json()
})

module.exports = router