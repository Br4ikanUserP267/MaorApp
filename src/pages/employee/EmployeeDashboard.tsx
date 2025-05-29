import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Container } from 'react-bootstrap';
import StaffLayout from '../../components/staff/layout/StaffLayout';
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
      weekly: 450000,
      monthly: 1800000,
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
    <StaffLayout role="estilista">
      <Container fluid className="dashboard-container">
        <div className="dashboard-header">
          <h2>Panel de Control</h2>
          <p className="text-muted">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
          </p>
        </div>

        <Row className="g-4 mb-4">
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon-wrapper primary">
                  <FaDollarSign size={24} />
                </div>
                <div className="stat-content">
                  <h6>Ventas Semana</h6>
                  <h3>${stats.weekly.toLocaleString()}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon-wrapper success">
                  <FaDollarSign size={24} />
                </div>
                <div className="stat-content">
                  <h6>Ventas Mes</h6>
                  <h3>${stats.monthly.toLocaleString()}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon-wrapper warning">
                  <FaClock size={24} />
                </div>
                <div className="stat-content">
                  <h6>Citas Hoy</h6>
                  <h3>{stats.appointmentsToday}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon-wrapper info">
                  <FaCalendarAlt size={24} />
                </div>
                <div className="stat-content">
                  <h6>Citas Semana</h6>
                  <h3>{stats.appointmentsWeek}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="appointments-card">
          <Card.Header>
            <h5 className="mb-0">Citas de Hoy</h5>
          </Card.Header>
          <Card.Body className="p-0">
            {appointments
              .filter(apt => apt.date === format(new Date(), 'yyyy-MM-dd'))
              .map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-time">
                    <FaClock className="me-2" />
                    {appointment.time}
                  </div>
                  <div className="appointment-details">
                    <div className="customer-info">
                      <h6>{appointment.customer.name}</h6>
                      <a href={`tel:${appointment.customer.phone}`} className="phone-link">
                        <FaPhoneAlt size={14} className="me-1" />
                        {appointment.customer.phone}
                      </a>
                    </div>
                    <div className="service-info">
                      <div className="service-name">{appointment.service.name}</div>
                      <div className="service-price">${appointment.service.price.toLocaleString()}</div>
                    </div>
                    <div className="appointment-status">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                </div>
              ))}
            {appointments.filter(apt => apt.date === format(new Date(), 'yyyy-MM-dd')).length === 0 && (
              <div className="no-appointments">
                <FaCalendarAlt size={40} className="text-muted mb-3" />
                <p>No hay citas programadas para hoy</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </StaffLayout>
  );
};

export default EmployeeDashboard; 