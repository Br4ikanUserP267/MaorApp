import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import { FaSearch, FaFileInvoiceDollar, FaPrint, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CashierLayout from '../../components/cashier/layout/CashierLayout';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './InvoicePage.css';

interface Invoice {
  id: number;
  number: string;
  clientName: string;
  date: string;
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
  paymentMethod: string;
}

// Mock service for now
const invoiceService = {
  getInvoices: async (params: any) => {
    // Mock implementation
    return [];
  },
  createInvoice: async (invoice: Invoice) => {
    // Mock implementation
    return invoice;
  },
  updateInvoice: async (id: number, invoice: Partial<Invoice>) => {
    // Mock implementation
    return invoice;
  },
  deleteInvoice: async (id: number) => {
    // Mock implementation
    return true;
  }
};

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState<Partial<Invoice>>({});

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getInvoices({
        search: searchTerm,
        status: filterStatus
      });
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Error al cargar las facturas');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedInvoice) {
        await invoiceService.updateInvoice(selectedInvoice.id, formData);
        toast.success('Factura actualizada exitosamente');
      } else {
        await invoiceService.createInvoice(formData as Invoice);
        toast.success('Factura creada exitosamente');
      }
      setShowNewInvoiceModal(false);
      setFormData({});
      setSelectedInvoice(null);
      fetchInvoices();
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error('Error al guardar la factura');
    }
  };

  const handleFilter = () => {
    fetchInvoices();
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants = {
      paid: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const handlePrint = (invoice: Invoice) => {
    // Implementar lógica de impresión
    console.log('Imprimir factura:', invoice);
  };

  const handleDownload = (invoice: Invoice) => {
    // Implementar lógica de descarga
    console.log('Descargar factura:', invoice);
  };

  return (
    <CashierLayout>
      <div className="dashboard-container">
        <div className="content-wrapper">
          <div className="dashboard-header">
            <h2>Gestión de Facturas</h2>
            <p className="text-muted">
              {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
            </p>
          </div>

          {/* Filtros */}
          <Card className="filter-card border-0 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group>
                    <Form.Label>Buscar Factura</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número de factura o cliente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">Todos los estados</option>
                      <option value="paid">Pagada</option>
                      <option value="pending">Pendiente</option>
                      <option value="cancelled">Cancelada</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="mb-3 d-flex align-items-end">
                  <Button variant="primary" onClick={handleFilter} className="w-100">
                    <FaSearch className="me-2" />
                    Filtrar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Lista de Facturas */}
          <Card className="invoice-list-card border-0 shadow-sm">
            <Card.Header>
              <h5>Lista de Facturas</h5>
              <Button variant="primary" className="btn-correjir" onClick={() => setShowNewInvoiceModal(true)}>
                <FaFileInvoiceDollar className="me-2" />Nueva Factura
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center p-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </Spinner>
                </div>
              ) : (
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Método de Pago</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No se encontraron facturas
                        </td>
                      </tr>
                    ) : (
                      invoices.map(invoice => (
                        <tr key={invoice.id}>
                          <td>{invoice.number}</td>
                          <td>{invoice.clientName}</td>
                          <td>{new Date(invoice.date).toLocaleDateString()}</td>
                          <td>${invoice.total.toLocaleString()}</td>
                          <td>
                            <Badge bg={getStatusBadgeVariant(invoice.status)}>
                              {invoice.status === 'paid' ? 'Pagada' : 
                               invoice.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                            </Badge>
                          </td>
                          <td>{invoice.paymentMethod}</td>
                          <td>
                            <div className="action-buttons">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handlePrint(invoice)}
                              >
                                <FaPrint />
                              </Button>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleDownload(invoice)}
                              >
                                <FaDownload />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Modal de Nueva Factura */}
        <Modal show={showNewInvoiceModal} onHide={() => setShowNewInvoiceModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedInvoice ? 'Editar Factura' : 'Nueva Factura'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Número de Factura</Form.Label>
                    <Form.Control
                      type="text"
                      name="number"
                      value={formData.number || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select
                      name="clientName"
                      value={formData.clientName || ''}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Seleccionar cliente...</option>
                      <option>Ana Martínez</option>
                      <option>Carlos Rodríguez</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="number"
                      name="total"
                      value={formData.total || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status || 'pending'}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="paid">Pagada</option>
                      <option value="pending">Pendiente</option>
                      <option value="cancelled">Cancelada</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Método de Pago</Form.Label>
                    <Form.Select
                      name="paymentMethod"
                      value={formData.paymentMethod || ''}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Seleccionar método...</option>
                      <option>Efectivo</option>
                      <option>Tarjeta de Crédito</option>
                      <option>Tarjeta de Débito</option>
                      <option>Transferencia</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowNewInvoiceModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedInvoice ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </CashierLayout>
  );
};

export default InvoicePage; 