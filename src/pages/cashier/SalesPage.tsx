import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaPrint, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CashierLayout from '../../components/cashier/layout/CashierLayout';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './SalesPage.css';

interface Sale {
  id: number;
  number: string;
  clientName: string;
  date: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
  items: number;
}

// Mock service for now
const saleService = {
  getSales: async (params: any) => {
    // Mock implementation
    return [];
  },
  createSale: async (sale: Sale) => {
    // Mock implementation
    return sale;
  },
  updateSale: async (id: number, sale: Partial<Sale>) => {
    // Mock implementation
    return sale;
  },
  deleteSale: async (id: number) => {
    // Mock implementation
    return true;
  }
};

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState<Partial<Sale>>({});

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await saleService.getSales({
        search: searchTerm,
        status: filterStatus
      });
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
      toast.error('Error al cargar las ventas');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSale) {
        await saleService.updateSale(selectedSale.id, formData);
        toast.success('Venta actualizada exitosamente');
      } else {
        await saleService.createSale(formData as Sale);
        toast.success('Venta creada exitosamente');
      }
      setShowNewSaleModal(false);
      setFormData({});
      setSelectedSale(null);
      fetchSales();
    } catch (error) {
      console.error('Error saving sale:', error);
      toast.error('Error al guardar la venta');
    }
  };

  const handleFilter = () => {
    fetchSales();
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants = {
      completed: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const handlePrint = (sale: Sale) => {
    // Implementar lógica de impresión
    console.log('Imprimir venta:', sale);
  };

  const handleDownload = (sale: Sale) => {
    // Implementar lógica de descarga
    console.log('Descargar venta:', sale);
  };

  return (
    <CashierLayout>
      <div className="dashboard-container">
        <div className="content-wrapper">
          <div className="dashboard-header">
            <h2>Gestión de Ventas</h2>
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
                    <Form.Label>Buscar Venta</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número de venta o cliente..."
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
                      <option value="completed">Completada</option>
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

          {/* Lista de Ventas */}
          <Card className="invoice-list-card border-0 shadow-sm">
            <Card.Header>
              <h5>Lista de Ventas</h5>
              <Button variant="primary" className="btn-correjir" onClick={() => setShowNewSaleModal(true)}>
                <FaShoppingCart className="me-2" />Nueva Venta
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
                      <th>Items</th>
                      <th>Estado</th>
                      <th>Método de Pago</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          No se encontraron ventas
                        </td>
                      </tr>
                    ) : (
                      sales.map(sale => (
                        <tr key={sale.id}>
                          <td>{sale.number}</td>
                          <td>{sale.clientName}</td>
                          <td>{new Date(sale.date).toLocaleDateString()}</td>
                          <td>${sale.total.toLocaleString()}</td>
                          <td>{sale.items}</td>
                          <td>
                            <Badge bg={getStatusBadgeVariant(sale.status)}>
                              {sale.status === 'completed' ? 'Completada' : 
                               sale.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                            </Badge>
                          </td>
                          <td>{sale.paymentMethod}</td>
                          <td>
                            <div className="action-buttons">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handlePrint(sale)}
                              >
                                <FaPrint />
                              </Button>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleDownload(sale)}
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

        {/* Modal de Nueva Venta */}
        <Modal show={showNewSaleModal} onHide={() => setShowNewSaleModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedSale ? 'Editar Venta' : 'Nueva Venta'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Número de Venta</Form.Label>
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
                      <option value="completed">Completada</option>
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
            <Button variant="secondary" onClick={() => setShowNewSaleModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedSale ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </CashierLayout>
  );
};

export default SalesPage; 