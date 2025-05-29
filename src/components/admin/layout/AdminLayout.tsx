import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSpa, 
  FaTachometerAlt, 
  FaUsers, 
  FaCalendarAlt, 
  FaConciergeBell,
  FaBoxOpen,
  FaUserTie,
  FaFileInvoiceDollar,
  FaChartBar,
  FaExclamationCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import '../../../assets/styles/variables.css';
import '../../../assets/styles/admin/admin-layout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />
    },
    { 
      path: '/admin/customers', 
      name: 'Clientes', 
      icon: <FaUsers />
    },
    { 
      path: '/admin/appointments', 
      name: 'Citas', 
      icon: <FaCalendarAlt />
    },
    { 
      path: '/admin/services', 
      name: 'Servicios', 
      icon: <FaConciergeBell />
    },
    { 
      path: '/admin/products', 
      name: 'Productos', 
      icon: <FaBoxOpen />
    },
    { 
      path: '/admin/employees', 
      name: 'Empleados', 
      icon: <FaUserTie />
    },
    { 
      path: '/admin/sales', 
      name: 'Ventas', 
      icon: <FaFileInvoiceDollar />
    },
    { 
      path: '/admin/reports', 
      name: 'Reportes', 
      icon: <FaChartBar />
    },
    { 
      path: '/admin/pqrf', 
      name: 'PQRF', 
      icon: <FaExclamationCircle />
    }
  ];

  return (
    <div className="admin-layout">
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar ${isMenuOpen ? 'show' : ''}`}>
        <div className="brand-container">
          <h2><FaSpa className="me-2" />MAOR</h2>
          <p>Centro de Belleza - Sincelejo</p>
        </div>

        <div className="menu-section">
          <h5 className="menu-section-title">MENÚ ADMINISTRADORA</h5>
          <div className="nav-menu">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="user-info">
          <div className="user-info-content">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Admin avatar" 
              className="user-avatar"
            />
            <div className="user-details">
              <p className="user-name">Usuario Administrador</p>
              <p className="user-role">Administradora Principal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 