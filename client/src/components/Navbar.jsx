import { Link } from 'react-router-dom'
import Logout from '../features/users/Logout'
import './Navbar.css'
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';

function Navbar({ auth }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <nav className="navbar-computer">
        <div className="navbar-computer-left">
          <div className="site-title"><Link to="">Fantasy Wit</Link></div>
          {auth &&
            < div className="navbar-computer-links">
              <ul>
                <li><Link to="">Home</Link></li>
                <li><Link to="/simulation">Simulation</Link></li>
              </ul>
            </div>
          }
        </div>
        <div className="navbar-computer-right">
          {!auth &&
            <div className="navbar-computer-links">
              <ul>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
          }
          {auth &&
            <div className="dropdown">
              <button className="dropdown-button"><RxHamburgerMenu /></button>
              <ul className="dropdown-content">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Logout /></li>
              </ul>
            </div>
          }
        </div>
      </nav>
      <nav className="navbar-mobile">
        <div className="navbar-mobile-header">
          <div className="site-title"><Link to="">Fantasy Wit</Link></div>
          <button className="dropdown-button-mobile" onClick={toggleMobileMenu}><RxHamburgerMenu /></button>
        </div>

        <div className={`navbar-mobile-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="">Home</Link></li>
            {auth && <li><Link to="/simulation">Simulation</Link></li>}
            {!auth && <li><Link to="/signup">Signup</Link></li>}
            {!auth && <li><Link to="/login">Login</Link></li>}
            {auth && <li><Link to="/profile">Profile</Link></li>}
            {auth && <li><Link to="/payment">Payment</Link></li>}
            {auth && <li><Logout /></li>}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar

