import React, { useState } from 'react';
import { Table, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaFileInvoice } from 'react-icons/fa';
import BasePage from '../../../components/cashier/base/BasePage';

interface Sale {
  id: number;
  date: string;
  client: string;
  items: string[];
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const SalesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example data - replace with actual API call
  const sales: Sale[] = [
    {
      id: 1,
      date: '2024-03-15 14:30',
      client: 'Ana García',
      items: ['Manicure', 'Pedicure'],
      total: 85000,
      paymentMethod: 'Efectivo',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-03-15 15:45',
      client: 'Carlos Rodríguez',
      items: ['Corte de Cabello', 'Tinte'],
      total: 150000,
      paymentMethod: 'Tarjeta',
      status: 'completed'
    },
    // Add more example sales here
  ];

  const filteredSales = sales.filter(sale =>
    sale.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.items.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: Sale['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusText = (status: Sale['status']) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <BasePage title="Gestión de Ventas">
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar ventas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="primary" className="btn-correjir me-2">
            <FaShoppingCart className="me-2" />
            Nueva Venta
          </Button>
          <Button variant="outline-primary">
            <FaFileInvoice className="me-2" />
            Generar Reporte
          </Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Items</th>
            <th>Total</th>
            <th>Método de Pago</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.date}</td>
              <td>{sale.client}</td>
              <td>{sale.items.join(', ')}</td>
              <td>${sale.total.toLocaleString()}</td>
              <td>{sale.paymentMethod}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(sale.status)}`}>
                  {getStatusText(sale.status)}
                </span>
              </td>
              <td>
                <Button variant="link" className="text-primary me-2 p-0">
                  Ver Detalles
                </Button>
                <Button variant="link" className="text-danger p-0">
                  Anular
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </BasePage>
  );
};

export default SalesPage; 