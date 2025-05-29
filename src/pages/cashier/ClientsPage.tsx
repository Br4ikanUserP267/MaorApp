import React, { useState } from 'react';
import { Container, Card, Form, InputGroup, Button, Table, Badge, Modal, Row, Col } from 'react-bootstrap';
import { FaSearch, FaUserPlus, FaEdit, FaWhatsapp, FaTrash, FaEye, FaHistory } from 'react-icons/fa';
import StaffLayout from '../../components/staff/layout/StaffLayout';

interface Client {
  id: number;
  document: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastVisit?: string;
}

interface Visit {
  id: number;
  date: string;
  service: string;
  professional: string;
  price: number;
  status: 'completed' | 'cancelled';
}

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClientModal, setShowClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Mock data
  const mockClients: Client[] = [
    {
      id: 1,
      document: '123456789',
      name: 'Ana',
      lastName: 'Martínez',
      phone: '300-123-4567',
      email: 'ana@example.com',
      address: 'Calle 123 #45-67',
      status: 'active',
      createdAt: '2024-01-15',
      lastVisit: '2024-02-20'
    },
    {
      id: 2,
      document: '987654321',
      name: 'María',
      lastName: 'González',
      phone: '301-234-5678',
      email: 'maria@example.com',
      address: 'Carrera 89 #12-34',
      status: 'active',
      createdAt: '2024-01-20',
      lastVisit: '2024-02-18'
    }
  ];

  const mockVisits: Visit[] = [
    {
      id: 1,
      date: '2024-02-20',
      service: 'Manicure y Pedicure',
      professional: 'Laura Pérez',
      price: 45000,
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-02-18',
      service: 'Corte de Cabello',
      professional: 'Carlos Rodríguez',
      price: 35000,
      status: 'completed'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowClientModal(true);
  };

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const handleViewHistory = (client: Client) => {
    setSelectedClient(client);
    setShowHistoryModal(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save logic
    setShowClientModal(false);
    setEditingClient(null);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic
    setShowDeleteModal(false);
    setSelectedClient(null);
  };

  return (
    <StaffLayout role="cashier">
      <div className="page-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h1 className="mb-0">Gestión de Clientes</h1>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => setShowClientModal(true)}>
                <FaUserPlus className="me-2" />
                Nuevo Cliente
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid>
        <div className="content-wrapper">
          <div className="search-bar">
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  placeholder="Buscar por documento o nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  <FaSearch /> Buscar
                </Button>
              </InputGroup>
            </Form>
          </div>

          <div className="table-container">
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Nombre Completo</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Última Visita</th>
                  <th className="text-center">Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.document}</td>
                    <td>{`${client.name} ${client.lastName}`}</td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                    <td>{client.lastVisit || 'Sin visitas'}</td>
                    <td className="text-center">
                      <Badge 
                        bg={client.status === 'active' ? 'success' : 'secondary'}
                        className="status-badge"
                      >
                        {client.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="success"
                          size="sm"
                          className="action-button"
                          onClick={() => handleWhatsApp(client.phone)}
                          title="WhatsApp"
                        >
                          <FaWhatsapp />
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          className="action-button"
                          onClick={() => handleViewHistory(client)}
                          title="Ver Historial"
                        >
                          <FaHistory />
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="action-button"
                          onClick={() => handleEditClient(client)}
                          title="Editar"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="action-button"
                          onClick={() => handleDeleteClient(client)}
                          title="Eliminar"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Client Modal */}
        <Modal 
          show={showClientModal} 
          onHide={() => {
            setShowClientModal(false);
            setEditingClient(null);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSaveClient}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Documento</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      defaultValue={editingClient?.document}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      required
                      defaultValue={editingClient?.phone}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      defaultValue={editingClient?.name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      defaultValue={editingClient?.lastName}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={editingClient?.email}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select defaultValue={editingClient?.status || 'active'}>
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editingClient?.address}
                />
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => {
                  setShowClientModal(false);
                  setEditingClient(null);
                }}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  {editingClient ? 'Guardar Cambios' : 'Crear Cliente'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Está seguro que desea eliminar al cliente {selectedClient?.name} {selectedClient?.lastName}?</p>
            <p className="text-danger mb-0">Esta acción no se puede deshacer.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Eliminar Cliente
            </Button>
          </Modal.Footer>
        </Modal>

        {/* History Modal */}
        <Modal 
          show={showHistoryModal} 
          onHide={() => setShowHistoryModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Historial de Visitas - {selectedClient?.name} {selectedClient?.lastName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="client-info mb-4">
              <h6 className="mb-3">Información del Cliente</h6>
              <Row>
                <Col md={6}>
                  <p><strong>Documento:</strong> {selectedClient?.document}</p>
                  <p><strong>Teléfono:</strong> {selectedClient?.phone}</p>
                  <p><strong>Email:</strong> {selectedClient?.email}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Dirección:</strong> {selectedClient?.address}</p>
                  <p><strong>Cliente desde:</strong> {selectedClient?.createdAt}</p>
                  <p><strong>Última visita:</strong> {selectedClient?.lastVisit || 'Sin visitas'}</p>
                </Col>
              </Row>
            </div>

            <h6 className="mb-3">Historial de Servicios</h6>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Servicio</th>
                  <th>Profesional</th>
                  <th>Precio</th>
                  <th className="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockVisits.map((visit) => (
                  <tr key={visit.id}>
                    <td>{visit.date}</td>
                    <td>{visit.service}</td>
                    <td>{visit.professional}</td>
                    <td>${visit.price.toLocaleString()}</td>
                    <td className="text-center">
                      <Badge 
                        bg={visit.status === 'completed' ? 'success' : 'danger'}
                        className="status-badge"
                      >
                        {visit.status === 'completed' ? 'Completado' : 'Cancelado'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </Container>
    </StaffLayout>
  );
};

export default ClientsPage; 