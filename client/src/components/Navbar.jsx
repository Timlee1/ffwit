import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ auth }) {
  return (
    <>
      {!auth && <Link to="/signup">Signup</Link>}
      {!auth && <Link to="/login">Login</Link>}
      {auth && <Link to="/logout">Logout</Link>}
      {auth && <Link to="/update-password">Update Password</Link>}
    </>
  )
}

export default Navbar