import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import { FaCalendarPlus, FaSearch, FaEdit, FaTimes, FaCheck, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import appointmentService, { Appointment, CreateAppointmentDto } from '../../services/appointmentService';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProfessional, setFilterProfessional] = useState('all');
  const [formData, setFormData] = useState<Partial<CreateAppointmentDto>>({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAppointments({
        date: filterDate,
        status: filterStatus,
        professionalId: filterProfessional
      });
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAppointment = async (id: number) => {
    try {
      await appointmentService.updateAppointment(id, { status: 'confirmed' });
      toast.success('Cita confirmada exitosamente');
      fetchAppointments();
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Error al confirmar la cita');
    }
  };

  const handleCancelAppointment = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea cancelar esta cita?')) {
      try {
        await appointmentService.updateAppointment(id, { status: 'canceled' });
        toast.success('Cita cancelada exitosamente');
        fetchAppointments();
      } catch (error) {
        console.error('Error canceling appointment:', error);
        toast.error('Error al cancelar la cita');
      }
    }
  };

  const handleSendReminder = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowReminderModal(true);
  };

  const handleConfirmSendReminder = () => {
    if (!selectedAppointment) return;

    const message = `Hola ${selectedAppointment.customer.name.split(' ')[0]}, este es un recordatorio de tu cita en MAOR Centro de Belleza.
📅 Fecha: ${new Date(selectedAppointment.date).toLocaleDateString('es-ES')}
⏰ Hora: ${selectedAppointment.time}
💆 Servicio: ${selectedAppointment.service.name}
👩‍⚕️ Profesional: ${selectedAppointment.professional.name}

📍 Ubicación: Carrera 25 #15-30, Sincelejo
📞 Teléfono: (605) 287 6543

Gracias por confiar en MAOR Centro de Belleza.`;

    const whatsappUrl = `https://wa.me/57${selectedAppointment.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowReminderModal(false);
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
      await appointmentService.createAppointment(formData as CreateAppointmentDto);
      toast.success('Cita creada exitosamente');
      setShowNewAppointmentModal(false);
      setFormData({});
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Error al crear la cita');
    }
  };

  const handleFilter = () => {
    fetchAppointments();
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants = {
      pending: 'warning',
      confirmed: 'success',
      completed: 'primary',
      canceled: 'danger'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><FaCalendarPlus className="me-2" />Gestión de Citas</h2>
        <Button variant="primary" onClick={() => setShowNewAppointmentModal(true)}>
          <FaCalendarPlus className="me-2" />Nueva Cita
        </Button>
      </div>

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
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
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="completed">Completada</option>
                  <option value="canceled">Cancelada</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Profesional</Form.Label>
                <Form.Select
                  value={filterProfessional}
                  onChange={(e) => setFilterProfessional(e.target.value)}
                >
                  <option value="all">Todos los profesionales</option>
                  <option value="1">Dra. Laura Martínez</option>
                  <option value="2">Est. Sofía Rodríguez</option>
                  <option value="3">Lic. Carolina Gómez</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={handleFilter}>
                <FaSearch className="me-2" />Filtrar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Listado de Citas */}
      <Card>
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Próximas Citas</h4>
          <div>
            <Badge bg="primary" className="me-2">{appointments.length} citas</Badge>
            <Badge bg="warning">{appointments.filter(apt => apt.status === 'pending').length} pendientes</Badge>
          </div>
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
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Profesional</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No se encontraron citas
                    </td>
                  </tr>
                ) : (
                  appointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{new Date(appointment.date).toLocaleDateString()}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <div>{appointment.customer.name}</div>
                        <small className="text-muted">{appointment.customer.phone}</small>
                      </td>
                      <td>
                        <div>{appointment.service.name}</div>
                        <small className="text-muted">${appointment.service.price.toLocaleString()}</small>
                      </td>
                      <td>{appointment.professional.name}</td>
                      <td>
                        <Badge bg={getStatusBadgeVariant(appointment.status)}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowNewAppointmentModal(true);
                          }}
                        >
                          <FaEdit />
                        </Button>
                        {appointment.status === 'pending' && (
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="me-1"
                            onClick={() => handleConfirmAppointment(appointment.id)}
                          >
                            <FaCheck />
                          </Button>
                        )}
                        {appointment.status !== 'canceled' && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-1"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            <FaTimes />
                          </Button>
                        )}
                        {appointment.status !== 'canceled' && (
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleSendReminder(appointment)}
                          >
                            <FaWhatsapp />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Nueva Cita */}
      <Modal show={showNewAppointmentModal} onHide={() => setShowNewAppointmentModal(false)} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaCalendarPlus className="me-2" />
            {selectedAppointment ? 'Editar Cita' : 'Nueva Cita'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select name="customerId" onChange={handleFormChange}>
                    <option value="">Seleccionar cliente...</option>
                    <option value="1">María González (CC 123456789)</option>
                    <option value="2">Carlos Ramírez (CC 456789123)</option>
                    <option value="new">+ Registrar nuevo cliente</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Select name="serviceId" onChange={handleFormChange}>
                    <option value="">Seleccionar servicio...</option>
                    <option value="1">Tratamiento Facial Premium ($180,000)</option>
                    <option value="2">Depilación Láser ($250,000)</option>
                    <option value="3">Masaje Relajante ($120,000)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Profesional</Form.Label>
              <Form.Select name="professionalId" onChange={handleFormChange}>
                <option value="">Seleccionar profesional...</option>
                <option value="1">Dra. Laura Martínez</option>
                <option value="2">Est. Sofía Rodríguez</option>
                <option value="3">Lic. Carolina Gómez</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                onChange={handleFormChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowNewAppointmentModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {selectedAppointment ? 'Actualizar' : 'Guardar'} Cita
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Recordatorio WhatsApp */}
      <Modal show={showReminderModal} onHide={() => setShowReminderModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaWhatsapp className="me-2" />
            Enviar Recordatorio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Está seguro que desea enviar un recordatorio por WhatsApp al cliente?</p>
          <div className="alert alert-info">
            <FaWhatsapp className="me-2" />
            Se abrirá WhatsApp con el mensaje preparado.
          </div>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Incluir detalles de la cita"
              defaultChecked
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mensaje personalizado (opcional)</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReminderModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleConfirmSendReminder}>
            <FaWhatsapp className="me-2" />
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppointmentsPage; 