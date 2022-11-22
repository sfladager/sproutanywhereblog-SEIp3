import { useState } from 'react'

import { Link } from 'react-router-dom'
import { Flex, Spacer, Button, IconButton, Text } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Fade as Hamburger } from 'hamburger-react'
import { VscAccount } from 'react-icons/vsc'
import { MdOutlineAccountCircle } from 'react-icons/md'


import NavLinks from './NavLinks.js'
import NavPlants from './NavPlants.js'
// import './navbar.scss'
import logo from '../../assets/logo.png'

const NavbarMobile = () => {

  const [open, setOpen] = useState(false)
 
  const handleMenuClick = () => {
    console.log('menu clicked')
    setOpen(!open)
  }
  const handleSearchClick = () => {
    console.log('search clicked')
  }
  const closeDropdown = () => setOpen(false)

  return (
    <Flex
      display={['flex', 'flex', 'none', 'none']}
      h="60px"
      align="center"
      justify="space-around"
    >
      <Flex
        top="1rem"
        justify="center"
        align="center"
      >    
        <Flex className="navbar-icon"
          ml="1rem"
        >
          <Hamburger className="burger-icon" toggled={open} toggle={handleMenuClick}/>
        </Flex>
        <Flex>
          {open && <NavLinks className="nav-menu-drop" isOpen={true} open={open} closeDropdown={closeDropdown}/>}
        </Flex>
      </Flex>
      <Spacer />
      <Flex
        top="1rem"
        left="1rem"
        align="center"
        justify="center"
      >
        <Link to="/"><img src={logo} alt="Sprout logo" className="sprout-logo"/></Link>
      </Flex>
      <Spacer />
      <Flex
        top="1rem"
        right="1rem"
        align="center"
      >  
        <Flex className="navbar-icon"
          mr="1rem"
          align="center"
          justify="center"
        >
          <SearchIcon className="search-icon" w={25} h={25} onClick={handleSearchClick} />
          <VscAccount className="account-icon" w={30} h={30} />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default NavbarMobile

// <Link to="/"><Button variant="ghost">succulents</Button></Link>
// <Link to="/"><Button variant="ghost">palms</Button></Link>
// <Link to="/"><Button variant="ghost">bonsai</Button></Link>
// <Link to="/"><Button variant="ghost">ferns</Button></Link>
// <Link to="/"><Button variant="ghost">foliage</Button></Link>