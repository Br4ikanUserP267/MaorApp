import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaCreditCard } from 'react-icons/fa';

interface PaymentMethodFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  initialData?: PaymentMethod;
}

interface PaymentMethod {
  id?: number;
  name: string;
  description: string;
  requires_approval: boolean;
  is_active: boolean;
  processing_fee_percent: string;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData
}) => {
  const [formData, setFormData] = useState<PaymentMethod>(initialData || {
    name: '',
    description: '',
    requires_approval: false,
    is_active: true,
    processing_fee_percent: '0'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      processing_fee_percent: parseFloat(formData.processing_fee_percent)
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-primary">
        <FaCreditCard className="me-2" />
        {initialData ? 'Editar' : 'Nuevo'} Método de Pago
      </h3>

      <Row className="g-3">
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Método *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej: Efectivo, Tarjeta de Crédito, etc."
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
              placeholder="Descripción o instrucciones especiales para este método de pago"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Comisión (%)</Form.Label>
            <Form.Control
              type="number"
              name="processing_fee_percent"
              value={formData.processing_fee_percent}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              placeholder="0.00"
            />
            <Form.Text className="text-muted">
              Porcentaje de comisión por usar este método de pago
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 mt-4">
            <Form.Check
              type="checkbox"
              id="requires_approval"
              name="requires_approval"
              label="Requiere Aprobación"
              checked={formData.requires_approval}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="is_active"
              name="is_active"
              label="Método Activo"
              checked={formData.is_active}
              onChange={handleChange}
              className="mt-2"
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
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Método'}
        </Button>
      </div>
    </Form>
  );
};

export default PaymentMethodForm; 