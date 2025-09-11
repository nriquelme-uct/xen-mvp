import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
function Login() {
    return (  
        <Container className="d-flex align-items-center justify-content-center p-4 text-dark">
                <div className='w-75 p-4 shadow rounded bg-white'>   
                    <h2>Log In!</h2>                 
                    <Form>
                        <Form.Group className='py-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='email@mail.com'/>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password'/>
                        </Form.Group>   
                            <Button className='bg-dark' type='submit'>Entrar</Button>
                    </Form>
                </div>
        </Container>
    );
}

export default Login;