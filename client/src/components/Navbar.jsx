import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ auth }) {
  return (
    <>
      <p>{auth && 'auth'}</p>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </>
  )
}

export default Navbar