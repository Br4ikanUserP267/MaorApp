import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';

interface Service {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
  description: string;
  status: 'active' | 'inactive';
}

const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services] = useState<Service[]>([
    {
      id: 1,
      name: 'Corte de Cabello',
      category: 'Peluquería',
      duration: 30,
      price: 35000,
      description: 'Corte de cabello profesional para damas',
      status: 'active'
    },
    // Más servicios aquí...
  ]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Gestión de Servicios</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="d-flex align-items-center">
            <FaPlus className="me-2" />
            Nuevo Servicio
          </Button>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={6} lg={4}>
                <Form.Group className="mb-0 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar servicios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Duración</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map(service => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.name}</td>
                  <td>{service.category}</td>
                  <td>{service.duration} min</td>
                  <td>${service.price.toLocaleString()}</td>
                  <td>{service.description}</td>
                  <td>
                    <Badge bg={service.status === 'active' ? 'success' : 'danger'}>
                      {service.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Editar
                    </Button>
                    <Button 
                      variant={service.status === 'active' ? 'outline-danger' : 'outline-success'} 
                      size="sm"
                    >
                      {service.status === 'active' ? 'Desactivar' : 'Activar'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ServicesPage; 