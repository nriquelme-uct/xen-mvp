import '../styles/footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Container, Col, Row } from 'react-bootstrap';


function FooterHome() {
    return (  
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs lg="1">
                        <FontAwesomeIcon icon={faInstagram} size='2x'/>
                    </Col>
                    <Col xs lg="1">
                        <FontAwesomeIcon icon={faFacebook} size='2x'/>
                    </Col>
                    <Col xs lg="1">
                        <FontAwesomeIcon icon={faTwitter} size='2x'/>
                    </Col>
                </Row>

            </Container>
    );
}

export default FooterHome;