import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEdit, FaTrash, FaCheck, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CashierLayout from '../../components/cashier/layout/CashierLayout';
import './CashierPages.css';

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  phone: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    date: '',
    time: '',
    phone: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Simulación de llamada a API
      const mockAppointments: Appointment[] = [
        {
          id: 1,
          clientName: 'María González',
          service: 'Corte y Color',
          date: '2024-02-20',
          time: '10:00',
          status: 'confirmed',
          phone: '300-123-4567'
        },
        {
          id: 2,
          clientName: 'Juan Pérez',
          service: 'Manicure',
          date: '2024-02-20',
          time: '11:30',
          status: 'pending',
          phone: '300-234-5678'
        },
        {
          id: 3,
          clientName: 'Ana Martínez',
          service: 'Pedicure',
          date: '2024-02-20',
          time: '14:00',
          status: 'cancelled',
          phone: '300-345-6789'
        }
      ];
      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
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
      if (selectedAppointment) {
        // Lógica para actualizar cita
        console.log('Actualizando cita:', { ...formData, id: selectedAppointment.id });
      } else {
        // Lógica para crear nueva cita
        console.log('Creando nueva cita:', formData);
      }
      setShowNewAppointmentModal(false);
      setShowEditAppointmentModal(false);
      setFormData({
        clientName: '',
        service: '',
        date: '',
        time: '',
        phone: ''
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedAppointment) return;
    try {
      // Lógica para eliminar cita
      console.log('Eliminando cita:', selectedAppointment.id);
      setShowDeleteModal(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <CashierLayout>
      <div className="cashier-content d-flex justify-content-center">
        <div className="content-wrapper" style={{ maxWidth: '1200px', width: '100%' }}>
          <div className="content-header">
            <div className="header-content">
              <h1>Gestión de Citas</h1>
              <p className="text-muted">
                {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
              </p>
            </div>
            <Button 
              variant="primary" 
              className="btn-correjir"
              onClick={() => {
                setSelectedAppointment(null);
                setFormData({
                  clientName: '',
                  service: '',
                  date: '',
                  time: '',
                  phone: ''
                });
                setShowNewAppointmentModal(true);
              }}
            >
              <FaCalendarAlt className="me-2" />
              Nueva Cita
            </Button>
          </div>

          <div className="content-body">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="search-box">
                      <FaSearch className="search-icon" />
                      <Form.Control
                        type="text"
                        placeholder="Buscar por cliente o servicio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control-lg"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="filter-box">
                      <FaFilter className="filter-icon" />
                      <Form.Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="form-control-lg"
                      >
                        <option value="all">Todos los estados</option>
                        <option value="pending">Pendientes</option>
                        <option value="confirmed">Confirmadas</option>
                        <option value="cancelled">Canceladas</option>
                        <option value="completed">Completadas</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead>
                      <tr>
                        <th className="px-4">Cliente</th>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th className="text-end px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="text-center py-4">
                            <div className="loading-spinner">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-4">
                            <div className="no-data-message">
                              <FaCalendarAlt className="mb-3" style={{ fontSize: '2rem', color: '#9b59b6' }} />
                              <p>No se encontraron citas</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="px-4">
                              <div className="d-flex align-items-center">
                                <div className="client-avatar">
                                  <FaUser />
                                </div>
                                <div className="ms-3">
                                  <div className="client-name">{appointment.clientName}</div>
                                  <div className="client-phone text-muted">
                                    <FaPhone className="me-1" />
                                    {appointment.phone}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="service-name">{appointment.service}</div>
                            </td>
                            <td>
                              <div className="date-info">
                                <FaCalendarAlt className="me-2 text-muted" />
                                {format(new Date(appointment.date), 'dd/MM/yyyy')}
                              </div>
                            </td>
                            <td>
                              <div className="time-info">
                                <FaClock className="me-2 text-muted" />
                                {appointment.time}
                              </div>
                            </td>
                            <td>
                              <div className="phone-info">
                                <FaPhone className="me-2 text-muted" />
                                {appointment.phone}
                              </div>
                            </td>
                            <td>
                              <Badge bg={getStatusBadgeVariant(appointment.status)} className="status-badge">
                                {getStatusText(appointment.status)}
                              </Badge>
                            </td>
                            <td className="text-end px-4">
                              <div className="action-buttons">
                                <Button
                                  variant="link"
                                  className="text-primary p-0 me-3"
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setFormData({
                                      clientName: appointment.clientName,
                                      service: appointment.service,
                                      date: appointment.date,
                                      time: appointment.time,
                                      phone: appointment.phone
                                    });
                                    setShowEditAppointmentModal(true);
                                  }}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant="link"
                                  className="text-danger p-0"
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal para Nueva/Editar Cita */}
      <Modal 
        show={showNewAppointmentModal || showEditAppointmentModal} 
        onHide={() => {
          setShowNewAppointmentModal(false);
          setShowEditAppointmentModal(false);
        }}
        centered
        className="appointment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAppointment ? 'Editar Cita' : 'Nueva Cita'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Cliente</Form.Label>
              <Form.Control
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleFormChange}
                required
                placeholder="Ingrese el nombre del cliente"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Servicio</Form.Label>
              <Form.Select
                name="service"
                value={formData.service}
                onChange={handleFormChange}
                required
              >
                <option value="">Seleccionar servicio</option>
                <option value="Corte y Color">Corte y Color</option>
                <option value="Manicure">Manicure</option>
                <option value="Pedicure">Pedicure</option>
                <option value="Masaje">Masaje</option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                placeholder="Ingrese el número de teléfono"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => {
                  setShowNewAppointmentModal(false);
                  setShowEditAppointmentModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit" className="btn-correjir">
                {selectedAppointment ? 'Actualizar' : 'Guardar'} Cita
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <FaTrash className="mb-3" style={{ fontSize: '2rem', color: '#e74c3c' }} />
            <p>¿Está seguro que desea eliminar esta cita?</p>
            <p className="text-muted">Esta acción no se puede deshacer.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </CashierLayout>
  );
};

export default AppointmentsPage; 