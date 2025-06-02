import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaShoppingCart, 
  FaChartLine,
  FaFileExcel,
  FaFilePdf
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import StaffLayout from '../../components/staff/layout/StaffLayout';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './CashierDashboard.css';

const CashierDashboard: React.FC = () => {
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
    console.log('Exportando a Excel...');
  };

  const handleExportPDF = () => {
    console.log('Exportando a PDF...');
  };

  return (
    <StaffLayout role="cashier">
      <Container fluid className="dashboard-container px-4 py-4">
        <div className="dashboard-header mb-4">
          <h2 className="mb-1">Panel de Control</h2>
          <p className="text-muted mb-0">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
          </p>
        </div>

        <div className="d-flex justify-content-end mb-4">
          <div className="export-buttons">
            <button className="btn btn-export btn-export-excel me-2" onClick={handleExportExcel}>
              <FaFileExcel /> Exportar Excel
            </button>
            <button className="btn btn-export btn-export-pdf" onClick={handleExportPDF}>
              <FaFilePdf /> Exportar PDF
            </button>
          </div>
        </div>
        
        <Row className="g-4 mb-4">
          <Col xs={12} sm={6} md={3}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon-wrapper primary me-3">
                  <FaUsers size={24} />
                </div>
                <div className="stat-content">
                  <h6 className="text-muted mb-1">Clientes Hoy</h6>
                  <h3 className="mb-0">45</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} sm={6} md={3}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon-wrapper success me-3">
                  <FaCalendarAlt size={24} />
                </div>
                <div className="stat-content">
                  <h6 className="text-muted mb-1">Citas Hoy</h6>
                  <h3 className="mb-0">12</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} sm={6} md={3}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon-wrapper warning me-3">
                  <FaShoppingCart size={24} />
                </div>
                <div className="stat-content">
                  <h6 className="text-muted mb-1">Ventas del Día</h6>
                  <h3 className="mb-0">$1,250</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} sm={6} md={3}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon-wrapper info me-3">
                  <FaChartLine size={24} />
                </div>
                <div className="stat-content">
                  <h6 className="text-muted mb-1">Meta Diaria</h6>
                  <h3 className="mb-0">75%</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card className="chart-container border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 py-3">
                <h5 className="mb-0 text-dark fw-bold">Ventas vs Citas</h5>
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
                      <Line 
                        type="monotone" 
                        dataKey="ventas" 
                        stroke="var(--correjir-primary)" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="citas" 
                        stroke="var(--correjir-secondary)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </StaffLayout>
  );
};

export default CashierDashboard; 