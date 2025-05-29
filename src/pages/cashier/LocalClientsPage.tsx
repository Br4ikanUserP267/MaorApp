import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Badge, Modal, Form, Table } from 'react-bootstrap';
import { FaUserPlus, FaWhatsapp, FaCheck, FaClock } from 'react-icons/fa';
import StaffLayout from '../../components/staff/layout/StaffLayout';

interface LocalClient {
  id: number;
  name: string;
  phone: string;
  service: string;
  professional: string;
  startTime: string;
  status: 'waiting' | 'in-service' | 'completed';
  estimatedDuration: string;
}

const LocalClientsPage = () => {
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  // Mock data
  const mockLocalClients: LocalClient[] = [
    {
      id: 1,
      name: 'Ana Martínez',
      phone: '300-123-4567',
      service: 'Manicure y Pedicure',
      professional: 'Laura Pérez',
      startTime: '10:00',
      status: 'in-service',
      estimatedDuration: '1:30'
    },
    {
      id: 2,
      name: 'María González',
      phone: '301-234-5678',
      service: 'Corte de Cabello',
      professional: 'Carlos Rodríguez',
      startTime: '10:30',
      status: 'waiting',
      estimatedDuration: '0:45'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge bg="warning">En Espera</Badge>;
      case 'in-service':
        return <Badge bg="info">En Servicio</Badge>;
      case 'completed':
        return <Badge bg="success">Completado</Badge>;
      default:
        return <Badge bg="secondary">Desconocido</Badge>;
    }
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <StaffLayout role="cashier">
      <Container fluid className="px-4">
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="mb-0">Clientes en Local</h1>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={() => setShowAddClientModal(true)}>
              <FaUserPlus className="me-2" />
              Registrar Llegada
            </Button>
          </Col>
        </Row>

        <Row>
          <Col lg={9}>
            <Card className="shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Clientes en Servicio</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4">Cliente</th>
                      <th>Servicio</th>
                      <th>Profesional</th>
                      <th className="text-center">Inicio</th>
                      <th className="text-center">Duración</th>
                      <th className="text-center">Estado</th>
                      <th className="text-end px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLocalClients.map((client) => (
                      <tr key={client.id}>
                        <td className="px-4">
                          <div className="fw-medium">{client.name}</div>
                          <small className="text-muted">{client.phone}</small>
                        </td>
                        <td>{client.service}</td>
                        <td>{client.professional}</td>
                        <td className="text-center">{client.startTime}</td>
                        <td className="text-center">{client.estimatedDuration}</td>
                        <td className="text-center">{getStatusBadge(client.status)}</td>
                        <td className="text-end px-4">
                          <div className="d-flex gap-2 justify-content-end">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleWhatsApp(client.phone)}
                            >
                              <FaWhatsapp />
                            </Button>
                            {client.status === 'waiting' && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  // Start service logic
                                }}
                              >
                                <FaClock />
                              </Button>
                            )}
                            {client.status === 'in-service' && (
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => {
                                  // Complete service logic
                                }}
                              >
                                <FaCheck />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3}>
            <Row className="g-4">
              <Col lg={12}>
                <Card className="shadow-sm">
                  <Card.Header className="bg-white py-3">
                    <h5 className="mb-0">Resumen del Día</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <div className="status-indicator warning me-2"></div>
                        <span>En Espera</span>
                      </div>
                      <Badge bg="warning" className="fs-6">3</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <div className="status-indicator info me-2"></div>
                        <span>En Servicio</span>
                      </div>
                      <Badge bg="info" className="fs-6">2</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <div className="status-indicator success me-2"></div>
                        <span>Completados</span>
                      </div>
                      <Badge bg="success" className="fs-6">8</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="status-indicator primary me-2"></div>
                        <span>Total del Día</span>
                      </div>
                      <Badge bg="primary" className="fs-6">13</Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={12}>
                <Card className="shadow-sm">
                  <Card.Header className="bg-white py-3">
                    <h5 className="mb-0">Tiempos de Espera</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="wait-time-item">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Manicure</span>
                        <Badge bg="secondary" className="wait-time">~20 min</Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Pedicure</span>
                        <Badge bg="secondary" className="wait-time">~30 min</Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Corte de Cabello</span>
                        <Badge bg="secondary" className="wait-time">~15 min</Badge>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Add Client Modal */}
        <Modal show={showAddClientModal} onHide={() => setShowAddClientModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Registrar Llegada de Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select>
                      <option value="">Seleccionar cliente...</option>
                      <option>Ana Martínez</option>
                      <option>María González</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Servicio</Form.Label>
                    <Form.Select>
                      <option value="">Seleccionar servicio...</option>
                      <option>Manicure y Pedicure</option>
                      <option>Corte de Cabello</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Profesional</Form.Label>
                    <Form.Select>
                      <option value="">Seleccionar profesional...</option>
                      <option>Laura Pérez</option>
                      <option>Carlos Rodríguez</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hora de Llegada</Form.Label>
                    <Form.Control type="time" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Notas</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddClientModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Registrar Llegada
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </StaffLayout>
  );
};

export default LocalClientsPage; 