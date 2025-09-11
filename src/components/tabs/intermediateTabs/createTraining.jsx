import { Container, Button, Alert, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { trainingService } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const CreateTraining = () => {
  const [formData, setFormData] = useState({
    name: '',
    clientName: '',
    workout: '',
    description: '',
    calories: '',
    duration: '',
    intensity: 'medium',
    type: 'mixed',
    notes: '',
    location: '',
    equipment: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      setError('Debes iniciar sesión para crear entrenamientos');
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        calories: parseFloat(formData.calories) || 0,
        duration: parseInt(formData.duration) || 0,
        equipment: formData.equipment ? formData.equipment.split(',').map(item => item.trim()) : [],
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        date: new Date().toISOString()
      };

      await trainingService.createTraining(submitData);
      setSuccess('Entrenamiento creado exitosamente');
      setFormData({
        name: '',
        clientName: '',
        workout: '',
        description: '',
        calories: '',
        duration: '',
        intensity: 'medium',
        type: 'mixed',
        notes: '',
        location: '',
        equipment: '',
        tags: ''
      });
    } catch (err) {
      setError('Error al crear el entrenamiento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Debes iniciar sesión para crear entrenamientos.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Crear Nuevo Entrenamiento</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Entrenamiento *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej: Entrenamiento de fuerza"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Cliente *</Form.Label>
              <Form.Control
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                placeholder="Ej: Juan Pérez"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Rutina de Ejercicio *</Form.Label>
              <Form.Control
                type="text"
                name="workout"
                value={formData.workout}
                onChange={handleChange}
                required
                placeholder="Ej: Piernas, Cardio, Upper Body"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Entrenamiento *</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Fuerza</option>
                <option value="flexibility">Flexibilidad</option>
                <option value="endurance">Resistencia</option>
                <option value="sports">Deportes</option>
                <option value="mixed">Mixto</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción detallada del entrenamiento"
          />
        </Form.Group>

        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Calorías Quemadas *</Form.Label>
              <Form.Control
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Duración (minutos) *</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                max="480"
                placeholder="60"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Intensidad</Form.Label>
              <Form.Select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="extreme">Extrema</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej: Gimnasio, Casa, Parque"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Equipamiento</Form.Label>
              <Form.Control
                type="text"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                placeholder="Ej: Mancuernas, Cinta, Pesas (separados por comas)"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Etiquetas</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ej: mañana, intenso, principiante (separadas por comas)"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Notas Adicionales</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notas sobre el entrenamiento, observaciones, etc."
          />
        </Form.Group>

        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Entrenamiento'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTraining;
