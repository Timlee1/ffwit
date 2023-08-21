import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../features/users/Logout'

function Navbar({ auth }) {
  return (
    <nav>
      <ul>
        {!auth && <li><Link to="/signup">Signup</Link></li>}
        {!auth && <li><Link to="/login">Login</Link></li>}
        {auth && <li><Logout /></li>}
        {auth && <li><Link to="/profile">Profile</Link></li>}
        {auth && <li><Link to="/payment">Payment</Link></li>}
        {auth && <li><Link to="/simulation">Simulation</Link></li>}
      </ul>
    </nav>
  )
}

export default Navbar