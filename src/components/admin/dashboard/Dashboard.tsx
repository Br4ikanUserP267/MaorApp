import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCut,
  FaBox,
  FaUsers,
  FaFilter
} from 'react-icons/fa';
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Spinner
} from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import dashboardService from '../../../services/dashboardService';

interface DashboardStats {
  appointmentsToday: number;
  totalSales: number;
  servicesProvided: number;
  productsSold: number;
  activeEmployees: number;
}

interface FilterState {
  date: string;
  appointmentStatus: string;
  invoiceStatus: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    appointmentsToday: 0,
    totalSales: 0,
    servicesProvided: 0,
    productsSold: 0,
    activeEmployees: 0
  });

  const [filters, setFilters] = useState<FilterState>({
    date: new Date().toISOString().split('T')[0],
    appointmentStatus: 'all',
    invoiceStatus: 'all'
  });

  const [serviceData, setServiceData] = useState<Array<{ name: string; value: number }>>([]);
  const [productData, setProductData] = useState<Array<{ name: string; value: number }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, serviceSales, productSales] = await Promise.all([
        dashboardService.getDashboardStats(filters),
        dashboardService.getServiceSales(filters),
        dashboardService.getProductSales(filters)
      ]);

      setStats(statsData);
      setServiceData(serviceSales);
      setProductData(productSales);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Aquí podrías mostrar un toast o notificación de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []); // Solo se ejecuta al montar el componente

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    fetchDashboardData();
  };

  const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number }> = ({ icon, title, value }) => (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="rounded-circle p-3 bg-primary bg-opacity-10 me-3">
            {icon}
          </div>
          <div>
            <h6 className="mb-0 text-muted">{title}</h6>
            <h4 className="mb-0 mt-1">{value}</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">Dashboard Administrativo</h2>
      
      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">
            <FaFilter className="me-2" />
            Filtros
          </h5>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Estado de cita</Form.Label>
                <Form.Select
                  name="appointmentStatus"
                  value={filters.appointmentStatus}
                  onChange={handleFilterChange}
                >
                  <option value="all">Todos</option>
                  <option value="scheduled">Programada</option>
                  <option value="completed">Completada</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="no_show">No asistió</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Estado de factura</Form.Label>
                <Form.Select
                  name="invoiceStatus"
                  value={filters.invoiceStatus}
                  onChange={handleFilterChange}
                >
                  <option value="all">Todos</option>
                  <option value="draft">Borrador</option>
                  <option value="paid">Pagada</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="refunded">Reembolsada</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end">
            <Button 
              variant="primary"
              onClick={handleApplyFilters}
            >
              Aplicar filtros
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Estadísticas */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={4}>
          <StatCard
            icon={<FaCalendarAlt className="text-primary" size={24} />}
            title="Citas del día"
            value={stats.appointmentsToday}
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            icon={<FaMoneyBillWave className="text-success" size={24} />}
            title="Ventas totales"
            value={`$${stats.totalSales.toLocaleString()}`}
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            icon={<FaCut className="text-info" size={24} />}
            title="Servicios prestados"
            value={stats.servicesProvided}
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            icon={<FaBox className="text-warning" size={24} />}
            title="Productos vendidos"
            value={stats.productsSold}
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            icon={<FaUsers className="text-danger" size={24} />}
            title="Empleados activos"
            value={stats.activeEmployees}
          />
        </Col>
      </Row>

      {/* Gráficas */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="mb-4">Ventas por servicio</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Ventas ($)" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="mb-4">Productos más vendidos</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" name="Unidades vendidas" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 