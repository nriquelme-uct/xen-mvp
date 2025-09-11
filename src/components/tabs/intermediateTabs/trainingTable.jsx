import { Container, Table, Button, Alert, Spinner, Row, Col, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { trainingService } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const TrainingTable = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [isCompleted, setIsCompleted] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadTrainings();
    }
  }, [isAuthenticated]);

  const loadTrainings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (type) params.type = type;
      if (isCompleted !== '') params.isCompleted = isCompleted;
      
      const response = await trainingService.getTrainings(params);
      setTrainings(response.trainings || response);
    } catch (err) {
      setError('Error al cargar los entrenamientos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadTrainings();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este entrenamiento?')) {
      try {
        await trainingService.deleteTraining(id);
        setTrainings(trainings.filter(training => training._id !== id));
      } catch (err) {
        setError('Error al eliminar el entrenamiento: ' + err.message);
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await trainingService.completeTraining(id);
      setTrainings(trainings.map(training => 
        training._id === id ? { ...training, isCompleted: true } : training
      ));
    } catch (err) {
      setError('Error al marcar como completado: ' + err.message);
    }
  };

  const getTypeBadge = (type) => {
    const variants = {
      cardio: 'danger',
      strength: 'primary',
      flexibility: 'success',
      endurance: 'warning',
      sports: 'info',
      mixed: 'secondary'
    };
    return <Badge bg={variants[type] || 'secondary'}>{type}</Badge>;
  };

  const getIntensityBadge = (intensity) => {
    const variants = {
      low: 'success',
      medium: 'warning',
      high: 'danger',
      extreme: 'dark'
    };
    return <Badge bg={variants[intensity] || 'secondary'}>{intensity}</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Debes iniciar sesión para ver los entrenamientos.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Sesiones de Entrenamiento</h2>
      
      {/* Filtros */}
      <Row className="mb-3">
        <Col md={4}>
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar entrenamientos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-primary">Buscar</Button>
          </form>
        </Col>
        <Col md={2}>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Fuerza</option>
            <option value="flexibility">Flexibilidad</option>
            <option value="endurance">Resistencia</option>
            <option value="sports">Deportes</option>
            <option value="mixed">Mixto</option>
          </select>
        </Col>
        <Col md={2}>
          <select
            className="form-select"
            value={isCompleted}
            onChange={(e) => setIsCompleted(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Completados</option>
            <option value="false">Pendientes</option>
          </select>
        </Col>
        <Col md={2}>
          <Button onClick={loadTrainings} variant="outline-secondary">
            Limpiar filtros
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando entrenamientos...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Entrenamiento</th>
              <th>Tipo</th>
              <th>Intensidad</th>
              <th>Duración (min)</th>
              <th>Calorías</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trainings.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">No hay entrenamientos registrados</td>
              </tr>
            ) : (
              trainings.map((training) => (
                <tr key={training._id}>
                  <td>{training.clientName}</td>
                  <td>{training.workout}</td>
                  <td>{getTypeBadge(training.type)}</td>
                  <td>{getIntensityBadge(training.intensity)}</td>
                  <td>{training.duration}</td>
                  <td>{training.calories}</td>
                  <td>
                    <Badge bg={training.isCompleted ? 'success' : 'warning'}>
                      {training.isCompleted ? 'Completado' : 'Pendiente'}
                    </Badge>
                  </td>
                  <td>{new Date(training.date).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex gap-1">
                      {!training.isCompleted && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleComplete(training._id)}
                        >
                          Completar
                        </Button>
                      )}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(training._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
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

export default TrainingTable;
