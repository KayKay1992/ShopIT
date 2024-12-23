import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'

function Header() {
  return (
    <header>
        <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
        <Container>
            <Navbar.Brand href='/'>ShopIT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link href='/cart'><FaShoppingCart size={24} /> Cart</Nav.Link>
                    <Nav.Link href='/login'><FaUser size={24} /> Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header