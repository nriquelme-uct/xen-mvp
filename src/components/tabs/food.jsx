import { useState } from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';
import FoodTable from "./intermediateTabs/foodTable";
import CreateFood from "./intermediateTabs/createFood";

const Food = () => {
    const [activeTab, setActiveTab] = useState('list');

    return (  
        <Container className="mt-4">
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
            >
                <Tab eventKey="list" title="Lista de Alimentos">
                    <FoodTable />
                </Tab>
                <Tab eventKey="create" title="Crear Alimento">
                    <CreateFood />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Food;
