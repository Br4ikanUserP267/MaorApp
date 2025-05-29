import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Customer, CreateCustomerDto } from '../../../services/customerService';

interface CustomerModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (customer: CreateCustomerDto) => Promise<void>;
  customer?: Customer;
  title: string;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  show,
  onHide,
  onSave,
  customer,
  title
}) => {
  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: '',
    email: '',
    phone: '',
    address: '',
    identification_number: '',
    customer_type: 'individual'
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        identification_number: customer.identification_number,
        customer_type: customer.customer_type
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        identification_number: '',
        customer_type: 'individual'
      });
    }
    setValidated(false);
  }, [customer, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await onSave(formData);
      onHide();
    } catch (error) {
      console.error('Error saving customer:', error);
      // El error se manejará en el componente padre
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                />
                <Form.Control.Feedback type="invalid">
                  El nombre es requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un email válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                />
                <Form.Control.Feedback type="invalid">
                  El teléfono es requerido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Identificación</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="identification_number"
                  value={formData.identification_number}
                  onChange={handleChange}
                  placeholder="Número de identificación"
                />
                <Form.Control.Feedback type="invalid">
                  La identificación es requerida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dirección completa"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de cliente</Form.Label>
            <Form.Select
              required
              name="customer_type"
              value={formData.customer_type}
              onChange={handleChange}
            >
              <option value="individual">Individual</option>
              <option value="business">Empresa</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CustomerModal; 