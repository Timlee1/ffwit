const postgres = require('../database/postgres')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')




const getAllUsers = asyncHandler(async (req, res) => {
  const users = await postgres.query("SELECT id, email FROM users")
  if (!users) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})

// Create a user 
// @route POST /users
const createUser = asyncHandler(async (req, res) => {
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
  const create_user = await postgres.query(create_user_query)
  if (create_user) {
    res.status(201).json({ message: `New user ${email} created` })
  } else {
    res.status(400).json({ message: 'Unable to create user' })
  }
})

// Update a user 
// @route PATCH /users
const updateUser = asyncHandler(async (req, res) => {
  const { id, email, password } = req.body

  if (!id || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const find_user_query = {
    text: "SELECT * FROM USERS WHERE id = $1",
    values: [id]
  }
  const user = await postgres.query(find_user_query)
  if (!user.rows.length) {
    return res.status(409).json({ message: 'User not found' })
  }

  const find_email_query = {
    text: "SELECT * FROM USERS WHERE email = $1",
    values: [email]
  }
  const email_used = await postgres.query(find_email_query)
  if (email_used.rows.length) {
    return res.status(409).json({ message: 'Email already used' })
  }

  if (password) {
    const update_password_query = {
      text: "",
      values: []
    }
  }

  if (email) {
    const upadate_email_query = {
      text: "",
      values: []
    }
  }
  console.log("To be implemented")
  res.status(201).json({ message: 'Placeholder for now' })

})

// Delete a user 
// @route DELETE /users
const deleteUser = asyncHandler(async (req, res) => {
  console.log("To be implemented")
  res.status(201).json({ message: 'Placeholder for now' })
})




module.exports = { getAllUsers, createUser, updateUser, deleteUser }