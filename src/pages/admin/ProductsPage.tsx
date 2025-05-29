import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBoxOpen, FaSearch } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Shampoo Profesional',
      brand: 'L\'Oréal',
      category: 'Cuidado del Cabello',
      price: 45000,
      stock: 15,
      status: 'in_stock'
    },
    // Más productos aquí...
  ]);

  const getStockBadge = (status: string) => {
    const variants = {
      in_stock: 'success',
      low_stock: 'warning',
      out_of_stock: 'danger'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Gestión de Productos</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="d-flex align-items-center">
            <FaBoxOpen className="me-2" />
            Nuevo Producto
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
                    placeholder="Buscar productos..."
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
                <th>Nombre</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Badge bg={getStockBadge(product.status)}>
                      {product.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Editar
                    </Button>
                    <Button variant="outline-success" size="sm">
                      Añadir Stock
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

export default ProductsPage; 