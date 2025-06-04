import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBox, 
  FaCut, 
  FaCreditCard,
  FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      icon: <FaTachometerAlt />, 
      label: 'Dashboard',
      description: 'Vista general del sistema'
    },
    { 
      path: '/admin/customers', 
      icon: <FaUsers />, 
      label: 'Gestión de Clientes',
      description: 'Administración de clientes'
    },
    { 
      path: '/admin/products', 
      icon: <FaBox />, 
      label: 'Gestión de Productos',
      description: 'Control de inventario'
    },
    { 
      path: '/admin/services', 
      icon: <FaCut />, 
      label: 'Gestión de Servicios',
      description: 'Servicios y tratamientos'
    },
    { 
      path: '/admin/employees', 
      icon: <FaUsers />, 
      label: 'Gestión de Empleados',
      description: 'Administración de personal'
    },
    { 
      path: '/admin/payment-methods', 
      icon: <FaCreditCard />, 
      label: 'Gestión de Métodos de Pago',
      description: 'Configuración de formas de pago',
      highlight: true
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div 
        className="bg-dark text-white" 
        style={{ 
          width: '250px', 
          minHeight: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          overflowY: 'auto'
        }}
      >
        <div className="p-3 border-bottom border-secondary">
          <h5 className="mb-0" style={{ color: '#8e44ad' }}>Panel de Administración</h5>
          <small className="text-muted">Bienvenido, {user?.name}</small>
        </div>
        <Nav className="flex-column p-3">
          {menuItems.map((item) => (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`mb-2 position-relative ${
                isActive(item.path) 
                  ? 'active bg-primary rounded' 
                  : 'text-white hover-effect'
              }`}
              style={{
                transition: 'all 0.3s ease',
                ...(item.highlight && !isActive(item.path) ? {
                  borderLeft: '3px solid #8e44ad'
                } : {})
              }}
            >
              <div className="d-flex align-items-center">
                <span className="me-2">{item.icon}</span>
                <div>
                  {item.label}
                  <small 
                    className="d-block text-muted" 
                    style={{ fontSize: '0.75rem' }}
                  >
                    {item.description}
                  </small>
                </div>
              </div>
            </Nav.Link>
          ))}
          <Nav.Link
            onClick={logout}
            className="text-white mt-4 border-top border-secondary pt-3 hover-effect"
            style={{ cursor: 'pointer' }}
          >
            <span className="me-2"><FaSignOutAlt /></span>
            Cerrar Sesión
          </Nav.Link>
        </Nav>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <Navbar bg="white" className="border-bottom shadow-sm py-3">
          <Container fluid>
            <Navbar.Brand style={{ color: '#8e44ad' }}>
              {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
            </Navbar.Brand>
            <div className="text-muted">
              {menuItems.find(item => isActive(item.path))?.description}
            </div>
          </Container>
        </Navbar>
        <div className="p-4">
          {children}
        </div>
      </div>

      <style>
        {`
          .hover-effect:hover {
            background-color: rgba(142, 68, 173, 0.1);
            border-radius: 0.25rem;
          }
          
          .nav-link.active {
            background-color: #8e44ad !important;
          }
          
          .nav-link {
            padding: 0.75rem 1rem;
            margin-bottom: 0.25rem;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout; 