import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaFileInvoiceDollar, FaSearch } from 'react-icons/fa';

interface Sale {
  id: number;
  date: string;
  customer: {
    name: string;
    phone: string;
  };
  items: {
    type: 'product' | 'service';
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  status: 'paid' | 'pending' | 'cancelled';
}

const SalesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sales] = useState<Sale[]>([
    {
      id: 1,
      date: '2024-03-18',
      customer: {
        name: 'María García',
        phone: '300-123-4567'
      },
      items: [
        {
          type: 'service',
          name: 'Corte de Cabello',
          quantity: 1,
          price: 35000
        },
        {
          type: 'product',
          name: 'Shampoo Profesional',
          quantity: 1,
          price: 45000
        }
      ],
      total: 80000,
      paymentMethod: 'card',
      status: 'paid'
    },
    // Más ventas aquí...
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const getPaymentMethodBadge = (method: string) => {
    const variants = {
      cash: 'success',
      card: 'info',
      transfer: 'primary'
    };
    return variants[method as keyof typeof variants] || 'secondary';
  };

  const filteredSales = sales.filter(sale =>
    sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.phone.includes(searchTerm) ||
    sale.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Gestión de Ventas</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="d-flex align-items-center">
            <FaFileInvoiceDollar className="me-2" />
            Nueva Venta
          </Button>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={6} lg={4}>
                <Form.Group className="mb-0 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar ventas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
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
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td>
                    <div>{sale.customer.name}</div>
                    <small className="text-muted">{sale.customer.phone}</small>
                  </td>
                  <td>
                    {sale.items.map((item, index) => (
                      <div key={index} className="mb-1">
                        <small>
                          {item.quantity}x {item.name}
                          <Badge bg={item.type === 'product' ? 'info' : 'primary'} className="ms-1">
                            {item.type}
                          </Badge>
                        </small>
                      </div>
                    ))}
                  </td>
                  <td>${sale.total.toLocaleString()}</td>
                  <td>
                    <Badge bg={getPaymentMethodBadge(sale.paymentMethod)}>
                      {sale.paymentMethod}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={getStatusBadge(sale.status)}>
                      {sale.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Ver Detalles
                    </Button>
                    <Button variant="outline-success" size="sm">
                      Imprimir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SalesPage; 