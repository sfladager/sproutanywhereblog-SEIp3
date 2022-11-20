import { Link } from 'react-router-dom'

const NavPlants = (isOpen, closeDropdown) => {

  return (
    <nav>
      <ul className="nav-plants-drop-ul">
        <Link to="/plants" className="nav-drop-plants">all plants</Link>
        <Link to="/plants/succulents" className="nav-drop-plants">succulents</Link>
        <Link to="/plants/palms" className="nav-drop-plants">palms</Link>
        <Link to="/plants/bonsai" className="nav-drop-plants">bonsai</Link>
        <Link to="/plants/ferns" className="nav-drop-plants">ferns</Link>
        <Link to="/plants/foliage" className="nav-drop-plants">foliage</Link>
      </ul>
    </nav>
  )
}

export default NavPlants
