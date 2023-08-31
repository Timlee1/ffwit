import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../features/users/Logout'
import './Navbar.css'
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';

function Navbar({ auth }) {
  const [toggle, setToggle] = useState(false)
  const handleToggle = (e) => {
    setToggle(toggle => !toggle)
  }
  return (
    <>
      <nav className="navbar-big navbar">
        <div className="navbar-left">
          <div className="site-title"><Link to="">Fantasy Wit</Link></div>
          <div className="navbar-links">
            <ul>
              <li><Link to="">Home</Link></li>
              {auth && <li><Link to="/simulation">Simulation</Link></li>}
              {!auth && <li><Link to="/signup">Signup</Link></li>}
              {!auth && <li><Link to="/login">Login</Link></li>}
            </ul>
          </div>
        </div>
        {auth &&
          <div className="dropdown">
            <button className="link" ><RxHamburgerMenu /></button>
            <ul className="dropdown-menu">
              {auth && <li><Link to="/profile">Profile</Link></li>}
              {auth && <li><Link to="/payment">Payment</Link></li>}
              {auth && <li><Logout /></li>}
            </ul>
          </div>
        }
      </nav>
      <nav className="navbar navbar-small">
        <div className="navbar-small-heading">
          <div className="site-title"><Link to="">Fantasy Wit</Link></div>
          <button className="link-small" onClick={handleToggle}><RxHamburgerMenu /></button>
        </div>
        {toggle &&
          <div className="navbar-small-links">
            <ul className="dropdown-menu-small">
              <li><Link to="">Home</Link></li>
              {auth && <li><Link to="/simulation">Simulation</Link></li>}
              {!auth && <li><Link to="/signup">Signup</Link></li>}
              {!auth && <li><Link to="/login">Login</Link></li>}
              {auth && <li><Link to="/profile">Profile</Link></li>}
              {auth && <li><Link to="/payment">Payment</Link></li>}
              {auth && <li><Logout /></li>}
            </ul>
          </div>
        }
      </nav>
    </>
  )
}

export default Navbar