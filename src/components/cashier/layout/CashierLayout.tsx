import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSpa, 
  FaUsers, 
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import '../../../assets/styles/cashier/cashier-layout.css';

interface CashierLayoutProps {
  children: React.ReactNode;
}

const CashierLayout: React.FC<CashierLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      path: '/cashier/clients', 
      name: 'Clientes', 
      icon: <FaUsers />,
      description: 'Gestión de clientes'
    },
    { 
      path: '/cashier/local-clients', 
      name: 'Clientes en Local', 
      icon: <FaUsers />,
      description: 'Clientes actualmente en el local'
    },
    { 
      path: '/cashier/appointments', 
      name: 'Gestión de Citas', 
      icon: <FaCalendarAlt />,
      description: 'Administrar citas y horarios'
    },
    { 
      path: '/cashier/sales', 
      name: 'Ventas', 
      icon: <FaFileInvoiceDollar />,
      description: 'Registro de ventas'
    }
  ];

  return (
    <div className="cashier-layout">
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
        </div>

        <div className="user-info">
          <div className="user-info-content">
            <img 
              src="https://via.placeholder.com/40" 
              alt="Cashier avatar" 
              className="user-avatar"
            />
            <div className="user-details">
              <p className="user-name">Usuario Cajero</p>
              <p className="user-role">Cajero Principal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cashier-content">
        {children}
      </div>
    </div>
  );
};

export default CashierLayout; 