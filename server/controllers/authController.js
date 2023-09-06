const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const postgres = require('../database/postgres')

const ACCESS_TOKEN_EXPIRATION = '15m'
const REFRESH_TOKEN_EXPIRATION = '7d' //change maxage if change this

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password, persist } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const find_user_query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  }

  const user = await postgres.query(find_user_query)

  if (!user.rows.length) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user_password = user.rows[0].password_hash
  const match = await bcrypt.compare(password, user_password)
  if (!match) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // const is_verified = user.rows[0].is_verified
  // if (!is_verified) {
  //   return res.status(401).json({ message: 'Not Verified' })
  // }



  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "id": user.rows[0].id,
        "email": user.rows[0].email,
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  )

  const refreshToken = jwt.sign(
    {
      "UserInfo": {
        "id": user.rows[0].id,
        "email": user.rows[0].email,
      }
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  )

  // Create secure cookie with refresh token 
  const maxAge = persist ? 1 * 24 * 60 * 60 * 1000 : 0
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'None', //cross-site cookie 
    maxAge: maxAge//cookie expiry: set to match refresh token
  })

  // Send accessToken containing id and email 
  res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
      const find_user_query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [decoded.UserInfo.email]
      }
      const user = await postgres.query(find_user_query)

      if (!user.rows.length) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "id": user.rows[0].id,
            "email": user.rows[0].email
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
      )

      res.json({ accessToken })
    })
  )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {

  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}

module.exports = {
  login,
  refresh,
  logout
}