import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../../helpers/auth'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'

const NavLinks = (open, isOpen, closeDropdown) => {
  const navigate = useNavigate()
  return (
    <nav>
      <ul className="nav-drop-ul slide-in-top slide-out-elliptic-top-bck">
        <Link to="/" onClick={() => isOpen && closeDropdown} className="nav-drop-link">plants<ChevronDownIcon /></Link>
        <Link to="/blogs/category/succulents" className="nav-drop-link">blog</Link>
        <Link to="/aboutus" className="nav-drop-link">about us</Link>
        {isAuthenticated() ?
          <>
            <span className='nav-link' onClick={() => handleLogout(navigate)}>Logout</span>
            <Link to="/profile" className="nav-drop-link">My Profile</Link>
          </>
          :
          <>
            <Link to="/register" className="nav-drop-link">register</Link>
            <Link to="/login" className="nav-drop-link">log in</Link>
          </>
        }
      </ul>
    </nav>
  )
}

export default NavLinks
