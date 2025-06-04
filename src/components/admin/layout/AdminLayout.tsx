import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  FaTimes,
  FaSignOutAlt,
  FaCreditCard
} from 'react-icons/fa';
import '../../../assets/styles/variables.css';
import '../../../assets/styles/admin/admin-layout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />
    },
    { 
      path: '/admin/customers', 
      name: 'Gestión de Clientes', 
      icon: <FaUsers />
    },
    { 
      path: '/admin/services', 
      name: 'Gestión de Servicios', 
      icon: <FaConciergeBell />
    },
    { 
      path: '/admin/products', 
      name: 'Gestión de Productos', 
      icon: <FaBoxOpen />
    },
    { 
      path: '/admin/employees', 
      name: 'Gestión de Empleados', 
      icon: <FaUserTie />
    },
    { 
      path: '/admin/payment-methods', 
      name: 'Gestión de Métodos de Pago', 
      icon: <FaCreditCard />,
      highlight: true
    }
  ];

  const handleLogout = () => {
    // Aquí iría la lógica de logout (limpiar tokens, etc.)
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${isMenuOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2><FaSpa className="me-2" />MAOR</h2>
        </div>

        <nav className="menu-section">
          <div className="nav-menu">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${location.pathname === item.path ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="user-info">
          <button 
            className="btn-maor logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>

      <style>
        {`
          .sidebar-item.highlight {
            border-left: 3px solid var(--maor-primary);
          }
          .sidebar-item.active {
            background-color: var(--maor-primary);
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout; 