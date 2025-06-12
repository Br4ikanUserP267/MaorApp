import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  requires_approval: boolean;
  is_active: boolean;
  processing_fee_percent: number;
}

const PaymentMethodsPage: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requires_approval: false,
    is_active: true,
    processing_fee_percent: 0
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  // Simulated data for development
  useEffect(() => {
    setPaymentMethods([
      {
        id: 1,
        name: 'Efectivo',
        description: 'Pago en efectivo',
        requires_approval: false,
        is_active: true,
        processing_fee_percent: 0
      },
      {
        id: 2,
        name: 'Tarjeta de Crédito',
        description: 'Visa, MasterCard, American Express',
        requires_approval: true,
        is_active: true,
        processing_fee_percent: 3.5
      }
    ]);
  }, []);

  const handleShowModal = () => {
    setEditingMethod(null);
    setFormData({
      name: '',
      description: '',
      requires_approval: false,
      is_active: true,
      processing_fee_percent: 0
    });
    setShowModal(true);
  };

  const handleEditModal = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      name: method.name,
      description: method.description,
      requires_approval: method.requires_approval,
      is_active: method.is_active,
      processing_fee_percent: method.processing_fee_percent
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMethod(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const showAlertMessage = (type: 'success' | 'danger', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMethod) {
      // Update existing method
      setPaymentMethods(prev => 
        prev.map(method => 
          method.id === editingMethod.id 
            ? { ...formData, id: method.id } 
            : method
        )
      );
      showAlertMessage('success', 'Método de pago actualizado exitosamente');
    } else {
      // Add new method
      setPaymentMethods(prev => [
        ...prev,
        { ...formData, id: Math.max(...prev.map(m => m.id), 0) + 1 }
      ]);
      showAlertMessage('success', 'Método de pago creado exitosamente');
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este método de pago?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      showAlertMessage('success', 'Método de pago eliminado exitosamente');
    }
  };

  return (
    <Container fluid className="py-4">
      {alert && (
        <Alert variant={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      )}
      
      <div className="d-flex align-items-center mb-4">
        <div className="me-3">
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle" style={{ color: 'var(--maor-primary)' }}>
            <FaCreditCard size={24} />
          </div>
        </div>
        <div>
          <h4 className="mb-0">Gestión de Métodos de Pago</h4>
          <p className="text-muted mb-0">Administra las formas de pago disponibles</p>
        </div>
      </div>
      
      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaMoneyBillWave className="me-2" style={{ color: 'var(--maor-primary)' }} />
              <span>Lista de Métodos de Pago</span>
            </div>
            <Button 
              variant="primary" 
              onClick={handleShowModal}
              style={{ backgroundColor: 'var(--maor-primary)', borderColor: 'var(--maor-primary)' }}
            >
              <FaPlus className="me-2" />
              Nuevo Método
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th className="text-center">Comisión</th>
                <th className="text-center">Requiere Aprobación</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.map(method => (
                <tr key={method.id}>
                  <td>{method.name}</td>
                  <td>
                    <small className="text-muted">
                      {method.description || 'Sin descripción'}
                    </small>
                  </td>
                  <td className="text-center">
                    {method.processing_fee_percent > 0 ? (
                      <Badge bg="info">{method.processing_fee_percent}%</Badge>
                    ) : (
                      <Badge bg="secondary">Sin comisión</Badge>
                    )}
                  </td>
                  <td className="text-center">
                    {method.requires_approval ? (
                      <Badge bg="warning">Requiere aprobación</Badge>
                    ) : (
                      <Badge bg="success">Automático</Badge>
                    )}
                  </td>
                  <td className="text-center">
                    <Badge bg={method.is_active ? 'success' : 'danger'}>
                      {method.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditModal(method)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(method.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {paymentMethods.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">
                    No hay métodos de pago registrados
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingMethod ? 'Editar' : 'Nuevo'} Método de Pago
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Nombre del Método *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Efectivo, Tarjeta de Crédito, etc."
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Descripción o instrucciones especiales para este método de pago"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Comisión (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="processing_fee_percent"
                    value={formData.processing_fee_percent}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mt-3">
                  <Form.Check
                    type="checkbox"
                    id="requires_approval"
                    name="requires_approval"
                    label="Requiere Aprobación"
                    checked={formData.requires_approval}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Check
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    label="Método Activo"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" className="me-2" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button 
                type="submit"
                style={{ backgroundColor: 'var(--maor-primary)', borderColor: 'var(--maor-primary)' }}
              >
                {editingMethod ? 'Actualizar' : 'Crear'} Método
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PaymentMethodsPage; 