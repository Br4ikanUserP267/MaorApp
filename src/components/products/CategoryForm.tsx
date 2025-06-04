import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { FaFolderPlus } from 'react-icons/fa';

interface CategoryFormProps {
  onSubmit: (categoryData: any) => void;
  isLoading?: boolean;
  categories?: Array<{ value: number; label: string }>;
  type: 'product' | 'service';
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  categories = [],
  type
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_id: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParentChange = (option: any) => {
    setFormData(prev => ({
      ...prev,
      parent_id: option
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-primary">
        <FaFolderPlus className="me-2" />
        Nueva Categoría de {type === 'product' ? 'Productos' : 'Servicios'}
      </h3>

      <Row className="g-3">
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Categoría *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre de la categoría"
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Descripción de la categoría"
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Categoría Padre</Form.Label>
            <Select
              options={categories}
              value={formData.parent_id}
              onChange={handleParentChange}
              placeholder="Seleccione una categoría padre (opcional)"
              isClearable
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
          {isLoading ? 'Guardando...' : 'Crear Categoría'}
        </Button>
      </div>
    </Form>
  );
};

export default CategoryForm; 