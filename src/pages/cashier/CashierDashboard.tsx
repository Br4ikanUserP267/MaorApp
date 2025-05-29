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
import BasePage from '../../components/cashier/base/BasePage';

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
    <BasePage title="Panel de Control">
      <Container fluid className="p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
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
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-primary bg-opacity-10 me-3">
                  <FaUsers className="text-primary" size={24} />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Clientes Hoy</h6>
                  <h3 className="mb-0 mt-1">45</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-success bg-opacity-10 me-3">
                  <FaCalendarAlt className="text-success" size={24} />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Citas Hoy</h6>
                  <h3 className="mb-0 mt-1">12</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-warning bg-opacity-10 me-3">
                  <FaShoppingCart className="text-warning" size={24} />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Ventas del Día</h6>
                  <h3 className="mb-0 mt-1">$1,250</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-danger bg-opacity-10 me-3">
                  <FaChartLine className="text-danger" size={24} />
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Meta Diaria</h6>
                  <h3 className="mb-0 mt-1">75%</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
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
    </BasePage>
  );
};

export default CashierDashboard; 