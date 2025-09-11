import { Container, Tabs, Tab } from "react-bootstrap";
import TestComponent from '../TestComponent';
import '../styles/home.css'

function Home() {
    return (  
        <Container className="mt-4">
            <h1 className="mb-4">Workout & Nutrition Tracker</h1>
            <TestComponent />
        </Container>
    );
}

export default Home;