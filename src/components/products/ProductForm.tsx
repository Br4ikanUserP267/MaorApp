import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { FaBox } from 'react-icons/fa';

interface ProductFormProps {
  onSubmit: (productData: any) => void;
  isLoading?: boolean;
  categories?: Array<{ value: number; label: string }>;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  categories = []
}) => {
  const [formData, setFormData] = useState({
    name: '',
    stock: 0,
    cost: '',
    price: '',
    category_id: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (option: any) => {
    setFormData(prev => ({
      ...prev,
      category_id: option
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      cost: parseFloat(formData.cost),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock.toString(), 10)
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-primary">
        <FaBox className="me-2" />
        Registrar Nuevo Producto
      </h3>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre del producto"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Select
              options={categories}
              value={formData.category_id}
              onChange={handleCategoryChange}
              placeholder="Seleccione una categoría"
              isClearable
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Stock Inicial *</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Costo *</Form.Label>
            <Form.Control
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Precio de Venta *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button 
          type="submit" 
          className="btn-maor"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Registrar Producto'}
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm; 