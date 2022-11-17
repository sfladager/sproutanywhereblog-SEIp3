import { Link } from 'react-router-dom'

const NavLinks = () => {

  return (
    <div className='navlinks'>
      <nav>
        <Link to="/">houseplants</Link>
        <Link to="/">succulents</Link>
        <Link to="/">plant care</Link>
        <Link to="/">blog</Link>
        <Link to="/">about us</Link>

        <Link to="/">register</Link>
        <Link to="/">log in</Link>

      </nav>
    </div>
  )
  
}

export default NavLinks