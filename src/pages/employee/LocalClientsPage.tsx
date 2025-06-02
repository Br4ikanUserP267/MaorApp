import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Modal, Form, Tab, Tabs } from 'react-bootstrap';
import { FaSpa, FaCube, FaUserMd, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import StaffLayout from '../../components/staff/layout/StaffLayout';
import localClientService, { Product, Service, Professional } from '../../services/localClientService';

interface LocalClient {
  id: number;
  name: string;
  status: 'active' | 'waiting' | 'completed';
  assignedProfessional: string;
  service: {
    name: string;
    price: number;
    professional: string;
    duration: number;
    progress?: number;
  };
  products: Array<{
    name: string;
    quantity: number;
  }>;
}

const EmployeeLocalClientsPage: React.FC = () => {
  const [clients, setClients] = useState<LocalClient[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<LocalClient | null>(null);
  
  // Data from services
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});

  // Form states
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [serviceNotes, setServiceNotes] = useState<string>('');

  // Mock current employee data (this would come from auth context in a real app)
  const currentEmployee = {
    id: 1,
    name: 'Dra. Laura Martínez',
    role: 'Dermatóloga'
  };

  // Group clients by time slots (morning, afternoon, evening)
  const timeSlots = {
    morning: clients.filter(client => client.status === 'waiting'),
    current: clients.filter(client => client.status === 'active'),
    completed: clients.filter(client => client.status === 'completed')
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, servicesData] = await Promise.all([
          localClientService.getProducts(),
          localClientService.getServices()
        ]);
        
        // Filter clients to only show those assigned to the current professional
        const mockClients: LocalClient[] = [
          {
            id: 1,
            name: "María González",
            status: "active",
            assignedProfessional: "Dra. Laura Martínez",
            service: {
              name: "Tratamiento Facial Premium",
              price: 180000,
              professional: "Dra. Laura Martínez",
              duration: 45,
              progress: 65
            },
            products: []
          },
          {
            id: 2,
            name: "Carlos Ramírez",
            status: "waiting",
            assignedProfessional: "Dra. Laura Martínez",
            service: {
              name: "Depilación Láser",
              price: 250000,
              professional: "Dra. Laura Martínez",
              duration: 30
            },
            products: []
          }
        ];

        setClients(mockClients.filter(client => 
          client.assignedProfessional === currentEmployee.name
        ));
        setProducts(productsData);
        setServices(servicesData);
        setProductsByCategory(localClientService.getProductsByCategory());
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Error al cargar los datos');
      }
    };

    loadData();
  }, []);

  const handleOpenProductModal = (client: LocalClient) => {
    setSelectedClient(client);
    setShowProductModal(true);
  };

  const handleOpenServiceModal = (client: LocalClient) => {
    setSelectedClient(client);
    setShowServiceModal(true);
  };

  const handleAddProduct = async (clientId: number) => {
    if (!selectedProduct || productQuantity < 1) {
      toast.error('Por favor seleccione un producto y cantidad válida');
      return;
    }

    try {
      await localClientService.addProductToClient(
        clientId,
        parseInt(selectedProduct),
        productQuantity
      );

      // Update local state
      setClients(prevClients => {
        return prevClients.map(client => {
          if (client.id === clientId) {
            const product = products.find(p => p.id === parseInt(selectedProduct));
            if (product) {
              return {
                ...client,
                products: [
                  ...client.products,
                  { name: product.name, quantity: productQuantity }
                ]
              };
            }
          }
          return client;
        });
      });

      toast.success('Producto agregado exitosamente');
      setShowProductModal(false);
      resetProductForm();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error al agregar el producto');
    }
  };

  const handleAddService = async (clientId: number) => {
    if (!selectedService) {
      toast.error('Por favor seleccione un servicio');
      return;
    }

    try {
      const service = services.find(s => s.id === parseInt(selectedService));
      if (service) {
        setClients(prevClients => {
          return prevClients.map(client => {
            if (client.id === clientId) {
              return {
                ...client,
                service: {
                  name: service.name,
                  price: service.price,
                  professional: currentEmployee.name,
                  duration: service.duration,
                  progress: 0
                }
              };
            }
            return client;
          });
        });
        toast.success('Servicio agregado exitosamente');
        setShowServiceModal(false);
        setSelectedService('');
        setServiceNotes('');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Error al agregar el servicio');
    }
  };

  const handleUpdateServiceProgress = async (clientId: number, progress: number) => {
    setClients(prevClients => {
      return prevClients.map(client => {
        if (client.id === clientId && client.service) {
          return {
            ...client,
            service: {
              ...client.service,
              progress
            }
          };
        }
        return client;
      });
    });
    toast.success('Progreso actualizado');
  };

  const resetProductForm = () => {
    setSelectedProduct('');
    setProductQuantity(1);
  };

  return (
    <StaffLayout role="employee">
      <Container fluid className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Clientes en Local</h2>
            <p className="text-muted mb-0">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

          <div className="calendar-grid">
            {/* Current Treatments */}
            {timeSlots.current.length > 0 && (
              <div className="mb-4">
                <div className="time-slot">
                  <FaUserMd className="me-2" />En Tratamiento
                </div>
                {timeSlots.current.map(client => (
                  <ClientCard 
                    key={client.id}
                    client={client}
                    onUpdateProgress={handleUpdateServiceProgress}
                    onAddProduct={handleOpenProductModal}
                    onAddService={handleOpenServiceModal}
                  />
                ))}
              </div>
            )}

            {/* Waiting Clients */}
            {timeSlots.morning.length > 0 && (
              <div className="mb-4">
                <div className="time-slot">
                  <FaClock className="me-2" />En Espera
                </div>
                {timeSlots.morning.map(client => (
                  <ClientCard 
                    key={client.id}
                    client={client}
                    onUpdateProgress={handleUpdateServiceProgress}
                    onAddProduct={handleOpenProductModal}
                    onAddService={handleOpenServiceModal}
                  />
                ))}
              </div>
            )}

            {/* Completed Treatments */}
            {timeSlots.completed.length > 0 && (
              <div className="mb-4">
                <div className="time-slot">
                  <FaUserMd className="me-2" />Completados
                </div>
                {timeSlots.completed.map(client => (
                  <ClientCard 
                    key={client.id}
                    client={client}
                    onUpdateProgress={handleUpdateServiceProgress}
                    onAddProduct={handleOpenProductModal}
                    onAddService={handleOpenServiceModal}
                  />
                ))}
              </div>
            )}
          </div>
        </Container>

      {/* Product Modal */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaCube className="me-2" />Registrar Producto - {selectedClient?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            if (selectedClient) {
              handleAddProduct(selectedClient.id);
            }
          }}>
            <Tabs defaultActiveKey="all" className="mb-3">
              <Tab eventKey="all" title="Todos">
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Producto</Form.Label>
                  <Form.Select 
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar producto...</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} (${product.price.toLocaleString()})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Tab>
              {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <Tab key={category} eventKey={category} title={category}>
                  <Form.Group className="mb-3">
                    <Form.Label>Productos {category}</Form.Label>
                    <Form.Select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      required
                    >
                      <option value="">Seleccionar producto...</option>
                      {categoryProducts.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} (${product.price.toLocaleString()})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Tab>
              ))}
            </Tabs>

            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={productQuantity}
                onChange={(e) => setProductQuantity(parseInt(e.target.value) || 1)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowProductModal(false)}>
                Cancelar
              </Button>
              <Button variant="maor" type="submit">
                <FaCube className="me-2" />Registrar Producto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Service Modal */}
      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaSpa className="me-2" />Añadir Servicio - {selectedClient?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            if (selectedClient) {
              handleAddService(selectedClient.id);
            }
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Servicio</Form.Label>
              <Form.Select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="">Seleccionar servicio...</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} (${service.price.toLocaleString()}) - {service.duration} min
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notas del Servicio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={serviceNotes}
                onChange={(e) => setServiceNotes(e.target.value)}
                placeholder="Observaciones o instrucciones especiales..."
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowServiceModal(false)}>
                Cancelar
              </Button>
              <Button variant="maor" type="submit">
                <FaSpa className="me-2" />Añadir Servicio
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </StaffLayout>
  );
};

// Client Card Component
interface ClientCardProps {
  client: LocalClient;
  onUpdateProgress: (clientId: number, progress: number) => void;
  onAddProduct: (client: LocalClient) => void;
  onAddService: (client: LocalClient) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ 
  client, 
  onUpdateProgress, 
  onAddProduct,
  onAddService 
}) => {
  return (
    <Card className={`client-card mb-3 ${client.status}`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">{client.name}</h5>
          <Badge bg={client.status === 'active' ? 'success' : 'warning'}>
            {client.status === 'active' ? 'En tratamiento' : 'En espera'}
          </Badge>
        </div>

        <div className="service-details">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong>{client.service.name}</strong>
              <div className="text-muted small">
                <FaClock className="me-1" />{client.service.duration} min
              </div>
            </div>
          </div>
          
          {client.status === 'active' && (
            <div className="mt-2">
              <label className="d-flex justify-content-between small mb-1">
                <span>Progreso del tratamiento</span>
                <span>{client.service.progress || 0}%</span>
              </label>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${client.service.progress || 0}%` }}
                ></div>
              </div>
              <div className="progress-controls">
                <Button
                  size="sm"
                  variant="outline-maor"
                  className="me-2"
                  onClick={() => onUpdateProgress(client.id, Math.min((client.service.progress || 0) + 10, 100))}
                >
                  +10%
                </Button>
                <Button
                  size="sm"
                  variant="outline-maor"
                  onClick={() => onUpdateProgress(client.id, Math.max((client.service.progress || 0) - 10, 0))}
                >
                  -10%
                </Button>
              </div>
            </div>
          )}
        </div>

        {client.products.length > 0 && (
          <div className="products-list">
            <h6 className="mb-2">
              <FaCube className="me-2" />Productos Utilizados
            </h6>
            {client.products.map((product, idx) => (
              <div key={idx} className="product-item">
                <span>{product.name}</span>
                <span className="badge bg-primary">
                  {product.quantity} unidad{product.quantity > 1 ? 'es' : ''}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button 
            variant="outline-maor" 
            size="sm"
            onClick={() => onAddService(client)}
          >
            <FaSpa className="me-1" />Servicio
          </Button>
          <Button 
            variant="maor"
            size="sm"
            onClick={() => onAddProduct(client)}
          >
            <FaCube className="me-1" />Producto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployeeLocalClientsPage; 