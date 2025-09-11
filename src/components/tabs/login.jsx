import { Container, Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(formData.username, formData.password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Error inesperado. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (  
        <Container className="d-flex align-items-center justify-content-center p-4 text-dark">
            <div className='w-75 p-4 shadow rounded bg-white'>   
                <h2>Log In!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='py-4'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type='text' 
                            name='username'
                            placeholder='username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>   
                    <Button 
                        className='bg-dark' 
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;