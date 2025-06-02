import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaHistory } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CashierLayout from '../../components/cashier/layout/CashierLayout';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Client {
  id: number;
  document: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastVisit?: string;
  notes?: string;
}

interface Visit {
  id: number;
  date: string;
  service: string;
  professional: string;
  price: number;
  status: 'completed' | 'cancelled';
}

// Mock service for now
const clientService = {
  getClients: async (params: any) => {
    // Mock implementation
    return [];
  },
  createClient: async (client: Client) => {
    // Mock implementation
    return client;
  },
  updateClient: async (id: number, client: Partial<Client>) => {
    // Mock implementation
    return client;
  },
  deleteClient: async (id: number) => {
    // Mock implementation
    return true;
  }
};

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [formData, setFormData] = useState<Partial<Client>>({});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getClients({
        search: searchTerm,
        status: filterStatus,
        sortBy
      });
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await clientService.deleteClient(id);
        toast.success('Cliente eliminado exitosamente');
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        toast.error('Error al eliminar el cliente');
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedClient) {
        await clientService.updateClient(selectedClient.id, formData);
        toast.success('Cliente actualizado exitosamente');
      } else {
        await clientService.createClient(formData as Client);
        toast.success('Cliente creado exitosamente');
      }
      setShowNewClientModal(false);
      setFormData({});
      setSelectedClient(null);
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Error al guardar el cliente');
    }
  };

  const handleFilter = () => {
    fetchClients();
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants = {
      active: 'success',
      inactive: 'danger',
      pending: 'warning'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  return (
    <CashierLayout>
      <Container fluid className="dashboard-container px-4 py-4">
        <div className="dashboard-header mb-4">
          <h2 className="mb-1">Gestión de Clientes</h2>
          <p className="text-muted mb-0">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Buscar Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre, teléfono o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Todos los estados</option>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="pending">Pendiente</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2} className="mb-3 d-flex align-items-end">
                <Button variant="primary" onClick={handleFilter} className="w-100">
                  <FaSearch className="me-2" />
                  Filtrar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Lista de Clientes */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0 text-dark fw-bold">Lista de Clientes</h5>
            <Button variant="primary" className="btn-correjir" onClick={() => setShowNewClientModal(true)}>
              <FaUserPlus className="me-2" />Nuevo Cliente
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center p-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </div>
            ) : (
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Fecha de Registro</th>
                    <th>Última Visita</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No se encontraron clientes
                      </td>
                    </tr>
                  ) : (
                    clients.map(client => (
                      <tr key={client.id}>
                        <td>
                          <div>{client.name}</div>
                          <small className="text-muted">ID: {client.id}</small>
                        </td>
                        <td>
                          <div>{client.email}</div>
                          <small className="text-muted">{client.phone}</small>
                        </td>
                        <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                        <td>{client.lastVisit ? new Date(client.lastVisit).toLocaleDateString() : 'Nunca'}</td>
                        <td>
                          <Badge bg={getStatusBadgeVariant(client.status)}>
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="me-1"
                            onClick={() => {
                              setSelectedClient(client);
                              setFormData(client);
                              setShowNewClientModal(true);
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => {
                              setSelectedClient(client);
                              setShowHistoryModal(true);
                            }}
                          >
                            <FaHistory />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Modal de Nuevo/Editar Cliente */}
        <Modal show={showNewClientModal} onHide={() => setShowNewClientModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleFormChange}
                      required
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
                      name="email"
                      value={formData.email || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Documento</Form.Label>
                    <Form.Control
                      type="text"
                      name="document"
                      value={formData.document || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status || 'active'}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="pending">Pendiente</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address || ''}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleFormChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowNewClientModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedClient ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Historial */}
        <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Historial del Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedClient && (
              <>
                <div className="mb-4">
                  <h5>{selectedClient.name}</h5>
                  <p className="text-muted mb-0">
                    Cliente desde {new Date(selectedClient.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4">
                  <h6>Últimas Visitas</h6>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Servicio</th>
                        <th>Profesional</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>15/03/2024</td>
                        <td>Tratamiento Facial Premium</td>
                        <td>Dra. Laura Martínez</td>
                        <td>$180,000</td>
                      </tr>
                      <tr>
                        <td>01/03/2024</td>
                        <td>Depilación Láser</td>
                        <td>Est. Sofía Rodríguez</td>
                        <td>$250,000</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </CashierLayout>
  );
};

export default ClientsPage; 