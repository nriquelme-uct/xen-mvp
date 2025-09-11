import { Container, Table, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { foodService } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const FoodTable = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadFoods();
    }
  }, [isAuthenticated]);

  const loadFoods = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;
      
      const response = await foodService.getFoods(params);
      setFoods(response.foods || response);
    } catch (err) {
      setError('Error al cargar los alimentos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadFoods();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este alimento?')) {
      try {
        await foodService.deleteFood(id);
        setFoods(foods.filter(food => food._id !== id));
      } catch (err) {
        setError('Error al eliminar el alimento: ' + err.message);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Debes iniciar sesión para ver los alimentos.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Registro de Alimentos</h2>
      
      {/* Filtros */}
      <Row className="mb-3">
        <Col md={6}>
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar alimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-primary">Buscar</Button>
          </form>
        </Col>
        <Col md={3}>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="breakfast">Desayuno</option>
            <option value="lunch">Almuerzo</option>
            <option value="dinner">Cena</option>
            <option value="snack">Snack</option>
            <option value="supplement">Suplemento</option>
            <option value="beverage">Bebida</option>
          </select>
        </Col>
        <Col md={3}>
          <Button onClick={loadFoods} variant="outline-secondary">
            Limpiar filtros
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando alimentos...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Porción</th>
              <th>Calorías</th>
              <th>Proteína</th>
              <th>Carbohidratos</th>
              <th>Grasa</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {foods.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No hay alimentos registrados</td>
              </tr>
            ) : (
              foods.map((food) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.portion}</td>
                  <td>{food.calories}</td>
                  <td>{food.protein || '-'}</td>
                  <td>{food.carbohydrates || '-'}</td>
                  <td>{food.fat || '-'}</td>
                  <td>{food.category || '-'}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(food._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default FoodTable;
