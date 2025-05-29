import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaCalendarPlus, FaSearch } from 'react-icons/fa';

interface Appointment {
  id: number;
  date: string;
  time: string;
  customer: {
    name: string;
    phone: string;
  };
  employee: {
    name: string;
  };
  service: {
    name: string;
    duration: number;
    price: number;
  };
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
}

const AppointmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      date: '2024-03-18',
      time: '09:00',
      customer: {
        name: 'María García',
        phone: '300-123-4567'
      },
      employee: {
        name: 'Laura Pérez'
      },
      service: {
        name: 'Corte de cabello',
        duration: 30,
        price: 35000
      },
      status: 'scheduled'
    },
    // Más citas aquí...
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'primary',
      completed: 'success',
      cancelled: 'danger',
      no_show: 'warning'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Gestión de Citas</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="d-flex align-items-center">
            <FaCalendarPlus className="me-2" />
            Nueva Cita
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
                    placeholder="Buscar citas..."
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
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Empleado</th>
                <th>Servicio</th>
                <th>Duración</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <div>{appointment.customer.name}</div>
                    <small className="text-muted">{appointment.customer.phone}</small>
                  </td>
                  <td>{appointment.employee.name}</td>
                  <td>{appointment.service.name}</td>
                  <td>{appointment.service.duration} min</td>
                  <td>${appointment.service.price.toLocaleString()}</td>
                  <td>
                    <Badge bg={getStatusBadge(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Editar
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Cancelar
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

export default AppointmentsPage; 