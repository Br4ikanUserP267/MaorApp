import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  FaCalendarAlt, 
  FaDollarSign, 
  FaClock, 
  FaUserCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaPhoneAlt
} from 'react-icons/fa';
import './EmployeeDashboard.css';

interface Appointment {
  id: number;
  date: string;
  time: string;
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  service: {
    name: string;
    duration: number;
    price: number;
  };
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
}

interface SalesStats {
  weekly: number;
  monthly: number;
  appointmentsToday: number;
  appointmentsWeek: number;
}

const EmployeeDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<SalesStats>({
    weekly: 0,
    monthly: 0,
    appointmentsToday: 0,
    appointmentsWeek: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - Replace with actual API calls
    const mockAppointments: Appointment[] = [
      {
        id: 1,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '09:00',
        customer: {
          id: 1,
          name: 'María García',
          phone: '300-123-4567'
        },
        service: {
          name: 'Corte de cabello',
          duration: 30,
          price: 35000
        },
        status: 'scheduled'
      },
      {
        id: 2,
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '10:00',
        customer: {
          id: 2,
          name: 'Ana Martínez',
          phone: '300-765-4321'
        },
        service: {
          name: 'Tinte y peinado',
          duration: 120,
          price: 85000
        },
        status: 'completed'
      }
    ];

    setAppointments(mockAppointments);

    setStats({
      weekly: 45000,
      monthly: 1800,
      appointmentsToday: 5,
      appointmentsWeek: 25
    });

    setLoading(false);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { variant: 'primary', icon: <FaCalendarAlt className="me-1" />, text: 'Programada' },
      completed: { variant: 'success', icon: <FaCheckCircle className="me-1" />, text: 'Completada' },
      cancelled: { variant: 'danger', icon: <FaTimesCircle className="me-1" />, text: 'Cancelada' },
      no_show: { variant: 'warning', icon: <FaTimesCircle className="me-1" />, text: 'No asistió' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return (
      <Badge bg={config.variant} className="d-flex align-items-center gap-1 status-badge">
        {config.icon}
        {config.text}
      </Badge>
    );
  };

  return (
    <Container fluid className="py-4">
      <div className="dashboard-header mb-4">
        <h2 className="mb-1">Panel de Control</h2>
        <p className="text-muted mb-0">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
        </p>
      </div>

      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} md={3}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon-wrapper primary me-3">
                <FaDollarSign size={24} />
              </div>
              <div className="stat-content">
                <h6 className="text-muted mb-1">Ventas Semana</h6>
                <h3 className="mb-0">${stats.weekly.toLocaleString()}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon-wrapper success me-3">
                <FaDollarSign size={24} />
              </div>
              <div className="stat-content">
                <h6 className="text-muted mb-1">Ventas Mes</h6>
                <h3 className="mb-0">${stats.monthly.toLocaleString()}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon-wrapper warning me-3">
                <FaClock size={24} />
              </div>
              <div className="stat-content">
                <h6 className="text-muted mb-1 text-dark fw-bold">Citas Hoy</h6>
                <h3 className="mb-0">{stats.appointmentsToday}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon-wrapper info me-3">
                <FaCalendarAlt size={24} />
              </div>
              <div className="stat-content">
                <h6 className="text-muted mb-1">Citas Semana</h6>
                <h3 className="mb-0">{stats.appointmentsWeek}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom-0">
          <h5 className="mb-0 text-dark fw-bold">Citas de Hoy</h5>
        </Card.Header>
        <Card.Body className="p-0">
          {appointments.length > 0 ? (
            appointments
              .filter(apt => apt.date === format(new Date(), 'yyyy-MM-dd'))
              .map(appointment => (
                <div key={appointment.id} className="appointment-item p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="appointment-time me-4">
                        <FaClock className="me-2 text-primary" />
                        <span className="fw-bold">{appointment.time}</span>
                      </div>
                      <div className="customer-info">
                        <h6 className="mb-1">{appointment.customer.name}</h6>
                        <a href={`tel:${appointment.customer.phone}`} className="phone-link text-muted text-decoration-none">
                          <FaPhoneAlt size={14} className="me-1" />
                          {appointment.customer.phone}
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="service-info text-end me-3">
                        <div className="service-name fw-bold">{appointment.service.name}</div>
                        <div className="service-price text-success">${appointment.service.price.toLocaleString()}</div>
                      </div>
                      <div className="appointment-status">
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="no-appointments text-center py-5">
              <FaCalendarAlt size={40} className="text-muted mb-3" />
              <p className="text-muted mb-0">No hay citas programadas para hoy</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeDashboard; 