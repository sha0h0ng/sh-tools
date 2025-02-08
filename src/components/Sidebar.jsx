import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Navbar bg='light' expand='lg' className='mb-3'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          Tools App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto flex-column'>
            <Nav.Link as={Link} to='/'>
              Randomizer Tool
            </Nav.Link>
            <Nav.Link as={Link} to='/password-generator'>
              Password Generator
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
