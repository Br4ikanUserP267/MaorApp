import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaUserPlus, FaSearch } from 'react-icons/fa';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'stylist' | 'assistant' | 'receptionist';
  status: 'active' | 'inactive';
  specialties: string[];
}

const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Laura Pérez',
      email: 'laura@maor.com',
      phone: '300-123-4567',
      role: 'stylist',
      status: 'active',
      specialties: ['Corte', 'Coloración', 'Peinados']
    },
    // Más empleados aquí...
  ]);

  const getRoleBadge = (role: string) => {
    const variants = {
      stylist: 'primary',
      assistant: 'info',
      receptionist: 'success'
    };
    return variants[role as keyof typeof variants] || 'secondary';
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Gestión de Empleados</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="d-flex align-items-center">
            <FaUserPlus className="me-2" />
            Nuevo Empleado
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
                    placeholder="Buscar empleados..."
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
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Especialidades</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Badge bg={getRoleBadge(employee.role)}>
                      {employee.role}
                    </Badge>
                  </td>
                  <td>
                    {employee.specialties.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        bg="secondary" 
                        className="me-1"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </td>
                  <td>
                    <Badge bg={employee.status === 'active' ? 'success' : 'danger'}>
                      {employee.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Editar
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Desactivar
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

export default EmployeesPage; 