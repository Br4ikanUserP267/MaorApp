import React, { useState } from 'react';
import { Container, Card, Table, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import { FaFileExcel, FaWhatsapp, FaPlus, FaTrash } from 'react-icons/fa';
import './EmployeeDashboard.css';

interface Invoice {
  id: string;
  date: string;
  client: string;
  phone: string;
  services: {
    name: string;
    price: number;
    type: 'service' | 'product';
  }[];
  total: number;
}

interface Service {
  id: number;
  name: string;
  price: number;
  type: 'service' | 'product';
}

const EmployeeInvoicePage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

  // Datos de ejemplo
  const clients = [
    { id: 1, name: 'María García', phone: '300-123-4567' },
    { id: 2, name: 'Ana Martínez', phone: '300-765-4321' },
  ];

  const services: Service[] = [
    { id: 1, name: 'Corte de cabello', price: 30000, type: 'service' },
    { id: 2, name: 'Tinte', price: 80000, type: 'service' },
    { id: 3, name: 'Shampoo Profesional', price: 45000, type: 'product' },
    { id: 4, name: 'Mascarilla Capilar', price: 35000, type: 'product' },
  ];

  const handleCreateInvoice = () => {
    if (!selectedClient) return;

    const client = clients.find(c => c.name === selectedClient);
    if (!client) return;

    const newInvoice: Invoice = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      client: client.name,
      phone: client.phone,
      services: [],
      total: 0
    };

    setCurrentInvoice(newInvoice);
    setShowAddModal(false);
  };

  const handleAddService = () => {
    if (!currentInvoice || !selectedService) return;

    const service = services.find(s => s.name === selectedService);
    if (!service) return;

    const updatedInvoice = {
      ...currentInvoice,
      services: [...currentInvoice.services, service],
      total: currentInvoice.total + service.price
    };

    setCurrentInvoice(updatedInvoice);
    setSelectedService('');
  };

  const handleRemoveService = (index: number) => {
    if (!currentInvoice) return;

    const service = currentInvoice.services[index];
    const updatedInvoice = {
      ...currentInvoice,
      services: currentInvoice.services.filter((_, i) => i !== index),
      total: currentInvoice.total - service.price
    };

    setCurrentInvoice(updatedInvoice);
  };

  const handleSaveInvoice = () => {
    if (!currentInvoice) return;
    setInvoices([...invoices, currentInvoice]);
    setCurrentInvoice(null);
    setSelectedClient('');
  };

  const handleExportCSV = (invoice: Invoice) => {
    const headers = [
      ['Factura:', invoice.id],
      ['Fecha:', invoice.date],
      ['Cliente:', invoice.client],
      [''],
      ['Servicio', 'Tipo', 'Precio']
    ];

    const serviceRows = invoice.services.map(service => [
      service.name,
      service.type === 'service' ? 'Servicio' : 'Producto',
      `$${service.price.toFixed(2)}`
    ]);

    const totalRow = ['', '', ''];
    const finalRow = ['Total:', '', `$${invoice.total.toFixed(2)}`];

    const csvContent = [
      ...headers,
      ...serviceRows,
      totalRow,
      finalRow
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `factura-${invoice.id}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppClick = (phone: string) => {
    const message = encodeURIComponent('¡Gracias por tu visita! Aquí está tu factura.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <Container fluid className="py-4">
      <div className="dashboard-header mb-4">
        <h2 className="mb-1">Facturas de Servicios</h2>
        <p className="text-muted mb-0">Gestión de facturas de servicios realizados</p>
      </div>

      {!currentInvoice && (
        <Button 
          variant="primary" 
          className="mb-4"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus className="me-2" />
          Nueva Factura
        </Button>
      )}

      {currentInvoice && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white border-bottom-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Nueva Factura</h5>
              <Button variant="success" onClick={handleSaveInvoice}>
                Guardar Factura
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Col md={6}>
                <h6>Cliente: {currentInvoice.client}</h6>
                <p className="text-muted mb-0">Tel: {currentInvoice.phone}</p>
              </Col>
              <Col md={6} className="text-md-end">
                <h6>Fecha: {currentInvoice.date}</h6>
                <p className="text-muted mb-0">ID: {currentInvoice.id}</p>
              </Col>
            </Row>

            <div className="mb-4">
              <Row>
                <Col md={8}>
                  <Form.Select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Seleccionar servicio o producto</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>
                        {service.name} - ${service.price.toLocaleString()} ({service.type === 'service' ? 'Servicio' : 'Producto'})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Button 
                    variant="primary" 
                    className="w-100"
                    onClick={handleAddService}
                    disabled={!selectedService}
                  >
                    <FaPlus className="me-2" />
                    Agregar
                  </Button>
                </Col>
              </Row>
            </div>

            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Servicio/Producto</th>
                    <th>Tipo</th>
                    <th className="text-end">Precio</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoice.services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.name}</td>
                      <td>{service.type === 'service' ? 'Servicio' : 'Producto'}</td>
                      <td className="text-end">${service.price.toLocaleString()}</td>
                      <td className="text-center">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveService(index)}
                          className="bg-danger text-white border-danger"
                          style={{ backgroundColor: '#dc3545' }}
                        >
                          <FaTrash className="me-1" />
                          Salir
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="table-active">
                    <td colSpan={2} className="text-end"><strong>Total</strong></td>
                    <td className="text-end"><strong>${currentInvoice.total.toLocaleString()}</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
      
      <Row className="g-4">
        {invoices.map((invoice) => (
          <Col xs={12} key={invoice.id}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom-0">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                  <h5 className="mb-0">Factura {invoice.id}</h5>
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleExportCSV(invoice)}
                      className="d-flex align-items-center"
                    >
                      <FaFileExcel className="me-2" />
                      Exportar CSV
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleWhatsAppClick(invoice.phone)}
                      className="d-flex align-items-center"
                    >
                      <FaWhatsapp className="me-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <Row>
                    <Col xs={12} md={6}>
                      <strong>Cliente:</strong> {invoice.client}
                    </Col>
                    <Col xs={12} md={6}>
                      <strong>Fecha:</strong> {invoice.date}
                    </Col>
                  </Row>
                </div>
                <div className="table-responsive">
                  <Table striped bordered hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Servicio/Producto</th>
                        <th>Tipo</th>
                        <th className="text-end">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.services.map((service, index) => (
                        <tr key={index}>
                          <td>{service.name}</td>
                          <td>{service.type === 'service' ? 'Servicio' : 'Producto'}</td>
                          <td className="text-end">${service.price.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="table-active">
                        <td colSpan={2} className="text-end"><strong>Total</strong></td>
                        <td className="text-end"><strong>${invoice.total.toLocaleString()}</strong></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Seleccionar Cliente</Form.Label>
              <Form.Select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                <option value="">Seleccionar cliente...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.name}>
                    {client.name} - {client.phone}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCreateInvoice}
            disabled={!selectedClient}
          >
            Crear Factura
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeInvoicePage; 