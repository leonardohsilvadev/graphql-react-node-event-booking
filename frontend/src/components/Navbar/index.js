import { NavLink } from 'react-router-dom'
import './styles.css'

const Navbar = () => (
  <header className="main-navigation">
    <div className="main-navigation-logo">
    <h1>ReaQL Events</h1>
    </div>

    <nav className="main-navigation-item">
      <ul>
      <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        <li>
          <NavLink to="/bookings">Bookings</NavLink>
        </li>
      </ul>
    </nav>
  </header>
)

export default Navbar