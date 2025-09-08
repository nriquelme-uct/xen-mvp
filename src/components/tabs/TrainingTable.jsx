import { Container, Table } from "react-bootstrap";

const TrainingTable = () => {
  const clients = [
    { id: 1, name: "Alice", workout: "Leg Day", calories: 2200 },
    { id: 2, name: "Bob", workout: "Cardio", calories: 1800 },
    { id: 3, name: "Charlie", workout: "Upper Body", calories: 2500 },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Client Sessions</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Workout</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.workout}</td>
              <td>{client.calories}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TrainingTable;
