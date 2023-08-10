import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../features/users/Logout'

function Navbar({ auth }) {
  return (
    <>
      {!auth && <Link to="/signup">Signup</Link>}
      {!auth && <Link to="/login">Login</Link>}
      {auth && <Logout />}
      {auth && <Link to="/profile">Profile</Link>}

    </>
  )
}

export default Navbar