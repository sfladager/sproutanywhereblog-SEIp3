import { Container } from '@chakra-ui/react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {
  return (
    <Container maxW={[null, null, null, 1600]}>
      <NavbarDesktop />
      <NavbarMobile />
    </Container>
  )  
}

export default Navbar