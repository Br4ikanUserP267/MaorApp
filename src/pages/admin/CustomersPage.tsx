import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaWhatsapp, FaEye, FaDownload } from 'react-icons/fa';
import BasePage from '../../components/admin/base/BasePage';
import customerService, { Customer, CreateCustomerDto, UpdateCustomerDto } from '../../services/customerService';
import { toast } from 'react-toastify';
import CustomerModal from '../../components/admin/customers/CustomerModal';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerType, setCustomerType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await customerService.deleteCustomer(id);
        toast.success('Cliente eliminado exitosamente');
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error('Error al eliminar el cliente');
      }
    }
  };

  const handleCreateCustomer = async (customerData: CreateCustomerDto) => {
    try {
      await customerService.createCustomer(customerData);
      toast.success('Cliente creado exitosamente');
      fetchCustomers();
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.error('Error al crear el cliente');
      throw error;
    }
  };

  const handleUpdateCustomer = async (customerData: CreateCustomerDto) => {
    if (!selectedCustomer) return;
    
    try {
      await customerService.updateCustomer(selectedCustomer.id, customerData as UpdateCustomerDto);
      toast.success('Cliente actualizado exitosamente');
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error al actualizar el cliente');
      throw error;
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(undefined);
    setShowModal(false);
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesType = customerType === 'all' || customer.customer_type === customerType;

    return matchesSearch && matchesType;
  });

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Gestión de Clientes</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="d-flex align-items-center" onClick={() => setShowModal(true)}>
            <FaUserPlus className="me-2" />
            Nuevo Cliente
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
                    placeholder="Buscar clientes..."
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
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Puntos de Fidelidad</th>
                  <th>Última Visita</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No se encontraron clientes
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>{customer.loyalty_points}</td>
                      <td>{new Date(customer.last_visit).toLocaleDateString()}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditCustomer(customer)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
                          <FaTrash />
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleWhatsApp(customer.phone)}>
                          <FaWhatsapp />
                        </Button>
                        <Button variant="outline-secondary" size="sm" onClick={() => handleEditCustomer(customer)}>
                          <FaEye />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <CustomerModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={selectedCustomer ? handleUpdateCustomer : handleCreateCustomer}
        customer={selectedCustomer}
        title={selectedCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}
      />
    </Container>
  );
};

export default CustomersPage; 