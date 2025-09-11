import { Container, Table } from "react-bootstrap";

const FoodTable = () => {
  const food = [
    { id: 1, name: "Chicken with Rice", porcion: "100gr", calories: 500 },
    { id: 2, name: "Protein shake", porcion: "100ml", calories: 250  },
    { id: 3, name: "water", porcion: "1000ml", calories: 0  },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Food register</h2>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Porcion</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {food.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.porcion}</td>
              <td>{food.calories}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FoodTable;
