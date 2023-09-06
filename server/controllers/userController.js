const postgres = require('../database/postgres')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const aws = require("@aws-sdk/client-ses");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const jwt = require('jsonwebtoken')

VERIFICATION_TOKEN_EXPIRATION = '6h'

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
  defaultProvider
})
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
  sendingRate: 1
});

const getUserRefresh = async (req, res) => {
  try {
    res.json({ email: req.email, message: 'User Found' })
  } catch (err) {
    return res.status(400).json({ message: 'Error' })
  }
}

// Create a user 
// @route POST /users
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const find_duplicate_query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    }
    const duplicate = await postgres.query(find_duplicate_query)

    if (duplicate.rows.length) {
      return res.status(409).json({ message: 'Email already used' })
    }

    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 

    const create_user_query = {
      text: 'INSERT INTO users(email, password_hash) VALUES($1, $2)',
      values: [email, hashedPassword]
    }
    await postgres.query(create_user_query)
    console.log("here")
    res.status(201).json({ message: `New user ${email} created` })
    // try {
    //   const token = jwt.sign(
    //     {
    //       "email": email,
    //     },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: VERIFICATION_TOKEN_EXPIRATION }
    //   )
    //   const url = process.env.CLIENT + `/verify?token=${token}`
    //   await transporter.sendMail(
    //     {
    //       from: process.env.EMAIL, //CHANGE THIS TO EMAIL VAR IN PRODUCTION
    //       to: process.env.EMAIL,
    //       subject: "Message",
    //       html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
    //     },
    //   );
    //   res.status(201).json({ message: `New user ${email} created` })
    // } catch (err) {
    //   return res.status(400).json({ message: 'Unable to send verification link' })
    // }
  } catch (err) {
    return res.status(400).json({ message: 'Unable to create user' })
  }

}

// Update a user 
// @route PATCH /users
const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body
    const userEmail = req.email

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (email !== userEmail) {
      return res.status(400).json({ message: 'Email is incorrect' })
    }

    const find_user_query = {
      text: "SELECT * FROM USERS WHERE email = $1",
      values: [email]
    }
    const user = await postgres.query(find_user_query)
    if (!user.rows.length) {
      return res.status(409).json({ message: 'User not found' })
    }
    const user_password = user.rows[0].password_hash
    const match = await bcrypt.compare(currentPassword, user_password)
    if (!match) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10) //salt rounds 
    const update_user_query = {
      text: 'UPDATE users SET password_hash = $1 WHERE email = $2',
      values: [hashedPassword, email]
    }
    await postgres.query(update_user_query)
    res.status(201).json({ message: `Password was reset` })
  } catch (err) {
    return res.status(403).json({ message: 'Unable reset password' })
  }
})

const verifyUser = async (req, res) => {
  try {
    const { token } = req.params
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        email = decoded.email
      }
    )
    const update_user_query = {
      text: 'UPDATE users SET is_verified = TRUE WHERE email = $1',
      values: [email]
    }
    await postgres.query(update_user_query)
    res.status(201).json({ message: `User Verified` })
  } catch (error) {
    return res.status(403).json({ message: 'Unable to verify email' })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const find_user_query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    }
    const user = await postgres.query(find_user_query)

    if (!user.rows.length) {
      return res.status(409).json({ message: 'Account not found' })
    }

    const token = jwt.sign(
      {
        "email": email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: VERIFICATION_TOKEN_EXPIRATION }
    )
    const url = process.env.CLIENT + `/reset-password?token=${token}`
    // await transporter.sendMail(
    //   {
    //     from: process.env.EMAIL, //CHANGE THIS TO EMAIL VAR IN PRODUCTION
    //     to: process.env.EMAIL,
    //     subject: "Message",
    //     html: `Please click this link to reset your password: <a href="${url}">${url}</a>`
    //   },
    // );

    res.status(201).json({ message: `Reset password email was sent` })

  } catch (err) {
    return res.status(400).json({ message: 'Unable to send email' })

  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        email = decoded.email
      }
    )

    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 

    const update_user_query = {
      text: 'UPDATE users SET password_hash = $1 WHERE email = $2',
      values: [hashedPassword, email]
    }
    await postgres.query(update_user_query)
    return res.status(201).json({ message: `Password was reset` })
  } catch (error) {
    return res.status(403).json({ message: 'Unable reset password' })
  }
}

module.exports = { getUserRefresh, createUser, updatePassword, verifyUser, forgotPassword, resetPassword }