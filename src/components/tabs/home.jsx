import { Container, Tabs, Tab } from "react-bootstrap";
import TrainingTable from "../tabs/TrainingTable";
import '../styles/home.css'

function Home() {
    return (  
        <Container className="mt-4">
      <h1 className="mb-4">Workout & Nutrition Tracker</h1>
      <Tabs defaultActiveKey="home" id="app-tabs" className="mb-3" fill>
        
        {/* Home tab */}
        <Tab eventKey="home" title="Home">
          <h2>Welcome!</h2>
          <p>This is the home screen content.</p>
        </Tab>

        {/* Table tab */}
        <Tab eventKey="clients" title="Client Sessions">
          <TrainingTable />
        </Tab>

      </Tabs>
    </Container>
    );
}

export default Home;