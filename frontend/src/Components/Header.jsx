import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { useSelector } from 'react-redux'



function Header() {
  const {cartItems} = useSelector((state)=> state.cart)
  const {userInfo} = useSelector((state)=> state.auth)

  const logoutHandler = () => {
    console.log('logged out successfully')
  }
 
  return (
    <header>
        <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
        <Container>
            <Navbar.Brand>ShopIT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link href='/cart'><FaShoppingCart size={24} /> Cart {
                      cartItems.length > 0 && (
                        <Badge pill bg='success' style={{marginLeft: '5px'}}>
                          {cartItems.reduce((a,c)=> a+c.qty, 0)}
                        </Badge>
                      )
                    }</Nav.Link>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id='username' as='div'>
                          <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                        <Nav.Link href='/login'><FaUser size={24} /> Sign In</Nav.Link>
                    )}  
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header
