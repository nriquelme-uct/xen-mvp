import { useState } from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';
import TrainingTable from "./intermediateTabs/trainingTable";
import CreateTraining from "./intermediateTabs/createTraining";

function Training() {
    const [activeTab, setActiveTab] = useState('list');

    return (  
        <Container className="mt-4">
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
            >
                <Tab eventKey="list" title="Lista de Entrenamientos">
                    <TrainingTable />
                </Tab>
                <Tab eventKey="create" title="Crear Entrenamiento">
                    <CreateTraining />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Training;