import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/authContext'

import './styles.css'

const Navbar = () => {
  const { token, logout } = useContext(AuthContext)

  return (
      <header className="main-navigation">
        <div className="main-navigation-logo">
        <h1>ReaQL Events</h1>
        </div>

        <nav className="main-navigation-item">
          <ul>
            {!token ? (
              <li>
                <NavLink to="/auth">Login</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            {token &&
              <li>
              <button onClick={logout}>Logout</button>
              </li>
            }
          </ul>
        </nav>
      </header>
  )
}

export default Navbar