import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { FaCut, FaTags } from 'react-icons/fa';

interface ServiceFormProps {
  onSubmit: (serviceData: any) => void;
  isLoading?: boolean;
  categories?: Array<{ value: number; label: string }>;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  categories = []
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    price: '',
    duration_minutes: '',
    is_taxable: true,
    tax_rate: '0',
    category_id: null,
    notes: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Limpiar error cuando el usuario modifica el campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (option: any) => {
    setFormData(prev => ({
      ...prev,
      category_id: option
    }));
    if (errors.category_id) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.category_id;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del servicio es requerido';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'La categoría es requerida';
    }
    if (!formData.duration_minutes) {
      newErrors.duration_minutes = 'La duración es requerida';
    }
    if (!formData.price) {
      newErrors.price = 'El precio es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      duration_minutes: parseInt(formData.duration_minutes, 10),
      tax_rate: parseFloat(formData.tax_rate)
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-primary d-flex align-items-center">
        <FaCut className="me-2" />
        Registrar Nuevo Servicio
      </h3>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          Por favor, corrija los siguientes errores:
          <ul className="mb-0">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Servicio *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre del servicio"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Código único del servicio"
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center">
              <FaTags className="me-2" />
              Categoría *
            </Form.Label>
            <Select
              options={categories}
              value={formData.category_id}
              onChange={handleCategoryChange}
              placeholder="Seleccione una categoría"
              isClearable
              className={errors.category_id ? 'is-invalid' : ''}
            />
            {errors.category_id && (
              <div className="invalid-feedback d-block">
                {errors.category_id}
              </div>
            )}
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
              placeholder="Descripción detallada del servicio"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Duración (minutos) *</Form.Label>
            <Form.Control
              type="number"
              name="duration_minutes"
              value={formData.duration_minutes}
              onChange={handleChange}
              required
              min="1"
              placeholder="Duración en minutos"
              isInvalid={!!errors.duration_minutes}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration_minutes}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Notas del Servicio</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Notas adicionales sobre el servicio"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="is_taxable"
              name="is_taxable"
              label="Aplica Impuesto"
              checked={formData.is_taxable}
              onChange={handleChange}
              className="mt-2"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tasa de Impuesto (%)</Form.Label>
            <Form.Control
              type="number"
              name="tax_rate"
              value={formData.tax_rate}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              disabled={!formData.is_taxable}
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
          {isLoading ? 'Guardando...' : 'Registrar Servicio'}
        </Button>
      </div>
    </Form>
  );
};

export default ServiceForm; 