import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSpa, 
  FaTachometerAlt, 
  FaUsers, 
  FaCalendarAlt, 
  FaUserTie, 
  FaFileInvoiceDollar,
  FaBoxOpen,
  FaChartBar,
  FaConciergeBell,
  FaExclamationCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import '../../../assets/styles/menus/admin-menu.css';

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />,
      path: '/admin/dashboard',
      description: 'Panel principal'
    },
    { 
      name: 'Clientes', 
      icon: <FaUsers />,
      path: '/admin/customers',
      description: 'Gestión de clientes'
    },
    { 
      name: 'Citas', 
      icon: <FaCalendarAlt />,
      path: '/admin/appointments',
      description: 'Agenda y citas'
    },
    { 
      name: 'Servicios', 
      icon: <FaConciergeBell />,
      path: '/admin/services',
      description: 'Catálogo servicios'
    },
    { 
      name: 'Productos', 
      icon: <FaBoxOpen />,
      path: '/admin/products',
      description: 'Inventario'
    },
    { 
      name: 'Empleados', 
      icon: <FaUserTie />,
      path: '/admin/employees',
      description: 'Personal'
    },
    { 
      name: 'Ventas', 
      icon: <FaFileInvoiceDollar />,
      path: '/admin/sales',
      description: 'Facturación'
    },
    { 
      name: 'Reportes', 
      icon: <FaChartBar />,
      path: '/admin/reports',
      description: 'Estadísticas'
    },
    { 
      name: 'PQRF', 
      icon: <FaExclamationCircle />,
      path: '/admin/pqrf',
      description: 'Solicitudes'
    }
  ];

  return (
    <>
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`admin-menu ${isMenuOpen ? 'show' : ''}`}>
        <div className="logo-container">
          <h2><FaSpa className="me-2" />MAOR</h2>
          <p>Centro de Belleza</p>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              title={item.description}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="user-info">
          <div className="user-info-content">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Admin avatar" 
              className="user-avatar"
            />
            <div className="user-details">
              <p className="user-name">Administrador</p>
              <p className="user-role">Principal</p>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminMenu;
