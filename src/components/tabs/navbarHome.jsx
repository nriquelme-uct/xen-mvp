import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarHome() {
    return (  

    <Navbar expand="lg" className="bg body-tertiary">
      <Container>
        <Navbar.Brand href="/">
            <img id='logo' src='src\assets\images\logoa.png'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='text-light' href="/">Home</Nav.Link>
            <Nav.Link className='text-light' href="/training">Training</Nav.Link>
            <Nav.Link className='text-light' href="/food">Food</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default NavbarHome;