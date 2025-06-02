import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSpa, 
  FaTachometerAlt, 
  FaStore,
  FaFileAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';
import '../../../assets/styles/employee/employee-layout.css';

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      path: '/employee/dashboard', 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />
    },
    { 
      path: '/employee/local-clients', 
      name: 'Clientes en Local', 
      icon: <FaStore />
    },
    { 
      path: '/employee/invoices', 
      name: 'Facturas', 
      icon: <FaFileAlt />
    }
  ];

  const handleLogout = () => {
    // Aquí iría la lógica de logout (limpiar tokens, etc.)
    navigate('/login');
  };

  return (
    <div className="employee-layout">
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
          <h5 className="menu-section-title">MENÚ EMPLEADO</h5>
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
              <span>E</span>
            </div>
            <div className="user-details">
              <p className="user-name">Usuario Empleado</p>
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

      <main className="employee-content">
        {children}
      </main>
    </div>
  );
};

export default EmployeeLayout; 