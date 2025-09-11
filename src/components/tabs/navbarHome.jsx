import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavbarHome() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (  
        <Navbar expand="lg" className="bg-dark">
            <Container>
                <Navbar.Brand href="/" className="text-light">
                    <img id='logo' src='src\assets\images\logoa.png' alt="Logo" style={{height: '40px'}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='text-light' href="/">Home</Nav.Link>
                        <Nav.Link className='text-light' href="/training">Training</Nav.Link>
                        <Nav.Link className='text-light' href="/food">Food</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link className='text-light' disabled>
                                    Bienvenido, {user?.username}
                                </Nav.Link>
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link className='text-light' href="/login">Iniciar Sesión</Nav.Link>
                                <Nav.Link className='text-light' href="/register">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarHome;