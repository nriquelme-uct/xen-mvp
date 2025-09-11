import { Container, Button, Alert, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { foodService } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    portion: '',
    calories: '',
    protein: '',
    carbohydrates: '',
    fat: '',
    fiber: '',
    sugar: '',
    sodium: '',
    category: 'snack',
    tags: '',
    image: '',
    barcode: ''
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
      setError('Debes iniciar sesión para crear alimentos');
      return;
    }

    setLoading(true);

    try {
      // Convertir strings vacíos a undefined para campos numéricos opcionales
      const submitData = {
        ...formData,
        calories: parseFloat(formData.calories) || 0,
        protein: formData.protein ? parseFloat(formData.protein) : undefined,
        carbohydrates: formData.carbohydrates ? parseFloat(formData.carbohydrates) : undefined,
        fat: formData.fat ? parseFloat(formData.fat) : undefined,
        fiber: formData.fiber ? parseFloat(formData.fiber) : undefined,
        sugar: formData.sugar ? parseFloat(formData.sugar) : undefined,
        sodium: formData.sodium ? parseFloat(formData.sodium) : undefined,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        image: formData.image || undefined,
        barcode: formData.barcode || undefined
      };

      await foodService.createFood(submitData);
      setSuccess('Alimento creado exitosamente');
      setFormData({
        name: '',
        description: '',
        portion: '',
        calories: '',
        protein: '',
        carbohydrates: '',
        fat: '',
        fiber: '',
        sugar: '',
        sodium: '',
        category: 'snack',
        tags: '',
        image: '',
        barcode: ''
      });
    } catch (err) {
      setError('Error al crear el alimento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Debes iniciar sesión para crear alimentos.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Crear Nuevo Alimento</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Alimento *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej: Pollo con arroz"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Porción *</Form.Label>
              <Form.Control
                type="text"
                name="portion"
                value={formData.portion}
                onChange={handleChange}
                required
                placeholder="Ej: 100gr, 1 taza, 200ml"
              />
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
            placeholder="Descripción del alimento"
          />
        </Form.Group>

        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Calorías *</Form.Label>
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
              <Form.Label>Proteína (g)</Form.Label>
              <Form.Control
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Carbohidratos (g)</Form.Label>
              <Form.Control
                type="number"
                name="carbohydrates"
                value={formData.carbohydrates}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Grasa (g)</Form.Label>
              <Form.Control
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Fibra (g)</Form.Label>
              <Form.Control
                type="number"
                name="fiber"
                value={formData.fiber}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Azúcar (g)</Form.Label>
              <Form.Control
                type="number"
                name="sugar"
                value={formData.sugar}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Sodio (mg)</Form.Label>
              <Form.Control
                type="number"
                name="sodium"
                value={formData.sodium}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="breakfast">Desayuno</option>
                <option value="lunch">Almuerzo</option>
                <option value="dinner">Cena</option>
                <option value="snack">Snack</option>
                <option value="supplement">Suplemento</option>
                <option value="beverage">Bebida</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Etiquetas</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ej: saludable, proteína, bajo en calorías (separadas por comas)"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Código de Barras</Form.Label>
          <Form.Control
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            placeholder="Código de barras del producto"
          />
        </Form.Group>

        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Alimento'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateFood;
