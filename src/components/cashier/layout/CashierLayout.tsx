import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSpa, 
  FaTachometerAlt, 
  FaUsers, 
  FaCalendarAlt, 
  FaFileInvoiceDollar,
  FaStore,
  FaFileAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';
import '../../../assets/styles/admin/admin-layout.css';

interface CashierLayoutProps {
  children: React.ReactNode;
}

const CashierLayout: React.FC<CashierLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      path: '/cashier/dashboard', 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />
    },
    { 
      path: '/cashier/clients', 
      name: 'Gestión de Clientes', 
      icon: <FaUsers />
    },
    { 
      path: '/cashier/local-clients', 
      name: 'Clientes en Local', 
      icon: <FaStore />
    },
    { 
      path: '/cashier/appointments', 
      name: 'Gestión de Citas', 
      icon: <FaCalendarAlt />
    },
    { 
      path: '/cashier/sales', 
      name: 'Gestión de Ventas', 
      icon: <FaFileInvoiceDollar />
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
        <div className="brand-container">
          <h2><FaSpa className="me-2" />MAOR</h2>
          <p>Centro de Belleza - Sincelejo</p>
        </div>

        <nav className="menu-section">
          <h5 className="menu-section-title">MENÚ CAJERO</h5>
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
        </nav>

        <div className="user-info">
          <div className="user-info-content">
            <div className="user-avatar">
              <span>C</span>
            </div>
            <div className="user-details">
              <p className="user-name">Usuario Cajero</p>
            </div>
          </div>
          <button 
            className="logout-button"
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
    </div>
  );
};

export default CashierLayout; 