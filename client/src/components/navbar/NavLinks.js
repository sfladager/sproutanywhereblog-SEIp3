import { Link } from 'react-router-dom'

import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'

const NavLinks = (open, isOpen, closeDropdown) => {

  return (
    <nav>
      <ul className="nav-drop-ul slide-in-top slide-out-elliptic-top-bck">
        <Link to="/" onClick={() => isOpen && closeDropdown} className="nav-drop-link">plants<ChevronDownIcon /></Link>
        <Link to="/" className="nav-drop-link">blog</Link>
        <Link to="/" className="nav-drop-link">about us</Link>
        <Link to="/" className="nav-drop-link">register</Link>
        <Link to="/" className="nav-drop-link">log in</Link>
      </ul>
    </nav>
  )
}

export default NavLinks
