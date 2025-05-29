import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaShoppingCart, 
  FaChartLine,
  FaFileExcel,
  FaFilePdf,
  FaDownload
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminPage: React.FC = () => {
  // Datos de ejemplo para las gráficas
  const salesData = [
    { name: 'Ene', ventas: 4000, citas: 2400 },
    { name: 'Feb', ventas: 3000, citas: 1398 },
    { name: 'Mar', ventas: 2000, citas: 9800 },
    { name: 'Abr', ventas: 2780, citas: 3908 },
    { name: 'May', ventas: 1890, citas: 4800 },
    { name: 'Jun', ventas: 2390, citas: 3800 },
  ];

  const handleExportExcel = () => {
    // Implementar exportación a Excel
    console.log('Exportando a Excel...');
  };

  const handleExportPDF = () => {
    // Implementar exportación a PDF
    console.log('Exportando a PDF...');
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Panel de Administración</h1>
        <div className="export-buttons">
          <button className="btn btn-export btn-export-excel" onClick={handleExportExcel}>
            <FaFileExcel /> Exportar Excel
          </button>
          <button className="btn btn-export btn-export-pdf" onClick={handleExportPDF}>
            <FaFilePdf /> Exportar PDF
          </button>
        </div>
      </div>
      
      <Row className="g-4 mb-4">
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <FaUsers className="text-primary me-3" size={24} />
              <div>
                <h6 className="mb-0">Total Clientes</h6>
                <h3 className="mb-0">1,234</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <FaCalendarAlt className="text-success me-3" size={24} />
              <div>
                <h6 className="mb-0">Citas Hoy</h6>
                <h3 className="mb-0">45</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <FaShoppingCart className="text-warning me-3" size={24} />
              <div>
                <h6 className="mb-0">Ventas del Día</h6>
                <h3 className="mb-0">$2,500</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center">
              <FaChartLine className="text-danger me-3" size={24} />
              <div>
                <h6 className="mb-0">Ingresos Mensuales</h6>
                <h3 className="mb-0">$45,500</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12} lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Ventas vs Citas</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventas" stroke="#8e44ad" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="citas" stroke="#2ecc71" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} lg={4}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Distribución de Servicios</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="citas" fill="#8e44ad" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Tendencia de Ingresos</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="ventas" stackId="1" stroke="#8e44ad" fill="#9b59b6" />
                    <Area type="monotone" dataKey="citas" stackId="1" stroke="#2ecc71" fill="#27ae60" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage; 