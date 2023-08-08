import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div>Navbar</div>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </>
  )
}

export default Navbar