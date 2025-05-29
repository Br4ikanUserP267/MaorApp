import { useState } from 'react';
import { Tab, Tabs, Modal, Form, Button, ProgressBar } from 'react-bootstrap';
import { FaUserPlus, FaSearch, FaEdit, FaCalendarPlus, FaStar, FaBirthdayCake, FaIdCard, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FiDownload, FiAlertTriangle } from 'react-icons/fi';
import { BsWhatsapp, BsDroplet, BsShieldExclamation } from 'react-icons/bs';
import MaorResponsiveMenuLeft from '../menu/menu';

const ClientesPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState(0);

  // Datos de ejemplo
  const clients = [
    {
      id: 1,
      name: 'María González',
      document: '123456789',
      phone: '3001234567',
      email: 'maria.gonzalez@example.com',
      birthDate: '21/06/1985',
      skinType: 'Mixta',
      allergies: 'Ninguna',
      status: 'active',
      totalVisits: 12,
      totalSpent: 1250000,
      satisfaction: 4.7,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isBirthday: true,
      isFrequent: false,
      history: [
        { date: '15/06/2023', service: 'Facial Anti-Edad', employee: 'Laura Martínez', value: 150000, rating: 5 },
        { date: '10/05/2023', service: 'Depilación Láser', employee: 'Carolina Gómez', value: 200000, rating: 5 },
        { date: '28/04/2023', service: 'Masaje Relajante', employee: 'Sofía Rodríguez', value: 120000, rating: 4.5 },
        { date: '15/03/2023', service: 'Manicura/Pedicura', employee: 'Sofía Rodríguez', value: 80000, rating: 5 }
      ],
      services: [
        { name: 'Facial Anti-Edad', count: 5, percentage: 45 },
        { name: 'Depilación Láser', count: 3, percentage: 30 },
        { name: 'Masaje Relajante', count: 2, percentage: 15 },
        { name: 'Manicura/Pedicura', count: 1, percentage: 10 }
      ],
      products: [
        { name: 'Crema Hidratante Premium', category: 'Facial', lastPurchase: '15/06/2023', timesPurchased: 3 },
        { name: 'Serum Revitalizante', category: 'Facial', lastPurchase: '10/05/2023', timesPurchased: 2 },
        { name: 'Aceite Esencial de Lavanda', category: 'Masajes', lastPurchase: '28/04/2023', timesPurchased: 1 }
      ],
      notes: [
        { date: '15/06/2023', employee: 'Laura Martínez', text: 'Cliente prefiere productos sin fragancia. Piel sensible en zona T.' },
        { date: '10/05/2023', employee: 'Carolina Gómez', text: 'Interesada en paquete de 6 sesiones de depilación láser.' }
      ]
    },
    {
      id: 2,
      name: 'Ana López',
      document: '987654321',
      phone: '3109876543',
      email: 'ana@example.com',
      birthDate: '15/08/1990',
      skinType: 'Normal',
      allergies: 'Alergia a la nuez',
      status: 'active',
      totalVisits: 8,
      totalSpent: 2800000,
      satisfaction: 4.9,
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      isBirthday: false,
      isFrequent: true
    }
  ];

  const stats = {
    totalClients: 156,
    newThisMonth: 12,
    birthdaysThisMonth: 5,
    frequentClients: 28,
    totalIncome: 15200000
  };

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/57${phone}`, '_blank');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" />);
    }
    
    return stars;
  };

  return (
    <div className="p-4" style={{ marginLeft: '280px' }}>
      {/* Encabezado */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2><i className="fas fa-users me-2"></i>Gestión de Clientes</h2>
          <p className="text-muted mb-0">Administración completa de la base de clientes</p>
        </div>
        <div>
          <Button variant="primary" className="me-2" onClick={() => setShowModal(true)}>
            <FaUserPlus className="me-2" />Nuevo Cliente
          </Button>
          <Button variant="outline-secondary">
            <FiDownload className="me-2" />Exportar
          </Button>
        </div>
      </div>

      {/* Filtros y estadísticas */}
      <div className="row mb-4">
        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <label htmlFor="searchClient" className="form-label">Buscar</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="searchClient" 
                      placeholder="Nombre, documento..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <FaSearch />
                    </button>
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <label htmlFor="filterStatus" className="form-label">Estado</label>
                  <select 
                    className="form-select" 
                    id="filterStatus"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos</option>
                    <option value="active">Activos</option>
                    <option value="inactive">Inactivos</option>
                    <option value="birthday">Cumpleaños</option>
                  </select>
                </div>
                <div className="col-md-4 mb-2">
                  <label htmlFor="filterDate" className="form-label">Última visita</label>
                  <select 
                    className="form-select" 
                    id="filterDate"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">Cualquier fecha</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="3months">Últimos 3 meses</option>
                    <option value="year">Último año</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-light h-100">
            <div className="card-body text-center">
              <h3 className="mb-1">{stats.totalClients}</h3>
              <small className="text-muted">Clientes registrados</small>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card client-detail-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Clientes nuevos</h6>
                  <small className="text-muted">Este mes</small>
                </div>
                <h4 className="mb-0 text-success">{stats.newThisMonth}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card client-detail-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Cumpleaños</h6>
                  <small className="text-muted">Este mes</small>
                </div>
                <h4 className="mb-0 text-primary">{stats.birthdaysThisMonth}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card client-detail-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Clientes frecuentes</h6>
                  <small className="text-muted">+3 visitas</small>
                </div>
                <h4 className="mb-0 text-warning">{stats.frequentClients}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card client-detail-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Ingresos totales</h6>
                  <small className="text-muted">Clientes</small>
                </div>
                <h4 className="mb-0 text-purple">${(stats.totalIncome / 1000000).toFixed(1)}M</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de clientes y detalles */}
      <div className="row">
        <div className="col-md-5">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><i className="fas fa-list me-2"></i>Lista de Clientes</h5>
              <small className="text-muted">Mostrando {clients.length} de {stats.totalClients}</small>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {clients.map((client, index) => (
                  <div 
                    key={client.id} 
                    className={`list-group-item border-0 ${selectedClient === index ? 'active' : ''}`}
                    onClick={() => setSelectedClient(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <img src={client.avatar} className="client-avatar me-3" alt={client.name} />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">{client.name}</h6>
                          {client.isBirthday && (
                            <span className="badge bg-danger">Hoy</span>
                          )}
                          {client.isFrequent && (
                            <span className="badge bg-warning">Frecuente</span>
                          )}
                          {client.status === 'inactive' && (
                            <span className="badge bg-secondary">Inactivo</span>
                          )}
                        </div>
                        <small className="text-muted">{client.document}</small>
                      </div>
                      <div className="text-end">
                        <small className="d-block">${(client.totalSpent / 1000).toFixed(0)}K</small>
                        <small className="text-muted">Total gastado</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer bg-white">
              <nav aria-label="Page navigation">
                <ul className="pagination pagination-sm justify-content-center mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1}>Anterior</a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Siguiente</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0"><i className="fas fa-user-circle me-2"></i>Detalle del Cliente</h5>
            </div>
            <div className="card-body">
              {selectedClient !== null && (
                <>
                  <div className="row mb-4">
                    <div className="col-md-3 text-center">
                      <img 
                        src={clients[selectedClient].avatar} 
                        className="img-fluid rounded-circle mb-2" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                        alt={clients[selectedClient].name}
                      />
                      <h5>{clients[selectedClient].name}</h5>
                      <span className={`badge bg-${clients[selectedClient].status === 'active' ? 'success' : 'secondary'}`}>
                        {clients[selectedClient].status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong><FaIdCard className="me-2" />Documento:</strong> {clients[selectedClient].document}</p>
                          <p><strong><FaBirthdayCake className="me-2" />Fecha Nacimiento:</strong> {clients[selectedClient].birthDate}</p>
                          <p><strong><FaEnvelope className="me-2" />Correo:</strong> {clients[selectedClient].email}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong><FaPhone className="me-2" />Teléfono:</strong> {clients[selectedClient].phone}</p>
                          <p><strong><BsDroplet className="me-2" />Tipo de Piel:</strong> {clients[selectedClient].skinType}</p>
                          <p><strong><FiAlertTriangle className="me-2" />Alergias:</strong> {clients[selectedClient].allergies}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start mt-2">
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <FaEdit className="me-1" />Editar
                        </button>
                        <button className="btn btn-sm btn-outline-secondary me-2">
                          <FaCalendarPlus className="me-1" />Agendar cita
                        </button>
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => openWhatsApp(clients[selectedClient].phone)}
                        >
                          <BsWhatsapp className="me-1" />WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-light p-3 text-center">
                        <h4 className="mb-0">{clients[selectedClient].totalVisits}</h4>
                        <small className="text-muted">Visitas totales</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light p-3 text-center">
                        <h4 className="mb-0">${(clients[selectedClient].totalSpent / 1000).toFixed(0)}K</h4>
                        <small className="text-muted">Total gastado</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light p-3 text-center">
                        <h4 className="mb-0">{clients[selectedClient].satisfaction}</h4>
                        <small className="text-muted">Satisfacción (prom.)</small>
                      </div>
                    </div>
                  </div>
                  
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k || 'history')}
                    className="mb-3"
                    id="client-tabs"
                  >
                    <Tab eventKey="history" title="Historial">
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>Servicio</th>
                              <th>Empleado</th>
                              <th>Valor</th>
                              <th>Calificación</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clients[selectedClient].history?.map((item, index) => (
                              <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.service}</td>
                                <td>{item.employee}</td>
                                <td>${item.value.toLocaleString()}</td>
                                <td>
                                  {renderStars(item.rating)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab>
                    <Tab eventKey="services" title="Servicios">
                      <div className="mb-3">
                        <h6>Servicios más utilizados</h6>
                        {clients[selectedClient].services?.map((service, index) => (
                          <ProgressBar 
                            key={index}
                            className="mb-2" 
                            style={{ height: '25px' }}
                          >
                            <ProgressBar 
                              now={service.percentage} 
                              label={`${service.name} (${service.count})`}
                              variant={index === 0 ? 'primary' : index === 1 ? 'info' : index === 2 ? 'secondary' : 'light'}
                              key={index}
                            />
                          </ProgressBar>
                        ))}
                      </div>
                    </Tab>
                    <Tab eventKey="products" title="Productos">
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Producto</th>
                              <th>Categoría</th>
                              <th>Última compra</th>
                              <th>Veces comprado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clients[selectedClient].products?.map((product, index) => (
                              <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.lastPurchase}</td>
                                <td>{product.timesPurchased}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab>
                    <Tab eventKey="notes" title="Notas">
                      <div className="mb-3">
                        <textarea className="form-control" rows={4} placeholder="Agregar notas sobre el cliente..."></textarea>
                        <Button variant="primary" className="mt-2">Guardar Notas</Button>
                      </div>
                      {clients[selectedClient].notes?.map((note, index) => (
                        <div key={index} className="procedure-item">
                          <small className="text-muted">{note.date} - {note.employee}</small>
                          <p>{note.text}</p>
                        </div>
                      ))}
                    </Tab>
                  </Tabs>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para nuevo cliente */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton className="text-white" style={{ backgroundColor: '#8e44ad' }}>
          <Modal.Title><FaUserPlus className="me-2" />Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>Documento de Identidad</Form.Label>
                <Form.Control type="text" required />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control type="date" required />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" required />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" required />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" required />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" />
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Piel</Form.Label>
              <Form.Select>
                <option value="">Seleccionar...</option>
                <option value="normal">Normal</option>
                <option value="seca">Seca</option>
                <option value="grasa">Grasa</option>
                <option value="mixta">Mixta</option>
                <option value="sensible">Sensible</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alergias o Condiciones</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Alergias, condiciones médicas relevantes..." />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cliente
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientesPage;