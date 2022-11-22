import { useState } from 'react'

import { Link } from 'react-router-dom'
import { Flex, Spacer, Button, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import customTheme from '../../pages/theme.js'

// import './navbar.scss'
import logo from '../../assets/logo.png'
import NavPlants from './NavPlants.js'

const NavbarDesktop = () => {

  const [open, setOpen] = useState(false)
 
  const handleMenuClick = () => {
    console.log('menu clicked')
    setOpen(!open)
  }
  // const handleMouseOver = () => {
  //   setOpen(true)
  // }
  // const handleMouseOut = () => {
  //   setOpen(false)
  // }
  const clickOutDropdown = (e) => {
    if (!e.target.classList.contains('nav-link-plants')) setOpen(false)
  }
  window.addEventListener('click', clickOutDropdown)
  const handleSearchClick = () => {
    console.log('search clicked')
  }
  const closeDropdown = () => setOpen(false)

  return (
    <Flex
      display={['none', 'none', 'flex', 'flex']}
      h="60px"
      align="center"
      justify="center"
    >
      <Flex

        top="1rem"
        left="1rem"
        ml="1rem"
        mx="15px"
        align="center"
      >
        <Link to="/"><img src={logo} alt="Sprout logo" className="sprout-logo" /></Link>
      </Flex>
      <Spacer />
      <Flex

        top="1rem"
        justify="center"
        align="center"
      >    
        <Flex className="navbar-links">
          <div className="nav-link-plants-container">
            <div className="nav-link nav-link-plants" 
              // onMouseEnter={handleMouseOver} 
              // onMouseOut={handleMouseOut}
              onClick={handleMenuClick}
              // onMouseOver={(e) => e.target.classList.add('plant-link-entered')}
            >plants<ChevronDownIcon />
              <Flex>
                {open && <NavPlants className="nav-plants-dropdown" isOpen={true} open={open} closeDropdown={closeDropdown}/>}
              </Flex>
            </div>
          </div>
          <Link to="/" className="nav-link">blog</Link>
          <Link to="/" className="nav-link">about us</Link>
        </Flex>
      </Flex>
      <Spacer />
      <Flex
        top="1rem"
        right="1rem"
      >  
        <Flex className="navbar-links"
          align="center"
          justify="center"
        >
          <Flex className="search-clickable" w={30} h={30} mx={15}
            align="center"
            justify="center"
          >
            <SearchIcon className="search-icon" w={17} h={17} />
          </Flex>
          <Link to="/" className="nav-link nav-link-acc">register</Link>
          <Link to="/" className="nav-link nav-link-acc">log in</Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default NavbarDesktop

// <Link to="/"><Button variant="ghost">succulents</Button></Link>
// <Link to="/"><Button variant="ghost">palms</Button></Link>
// <Link to="/"><Button variant="ghost">bonsai</Button></Link>
// <Link to="/"><Button variant="ghost">ferns</Button></Link>
// <Link to="/"><Button variant="ghost">foliage</Button></Link>