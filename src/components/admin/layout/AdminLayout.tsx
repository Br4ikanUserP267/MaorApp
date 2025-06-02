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
  FaSignOutAlt
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
      path: '/admin/sales', 
      name: 'Gestión de Ventas', 
      icon: <FaFileInvoiceDollar />
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
      path: '/admin/pqrf', 
      name: 'PQRF', 
      icon: <FaExclamationCircle />
    },
    { 
      path: '/admin/reports', 
      name: 'Reportes', 
      icon: <FaChartBar />
    },
    { 
      path: '/admin/appointments', 
      name: 'Gestión de Citas', 
      icon: <FaCalendarAlt />
    },
    { 
      path: '/admin/employees', 
      name: 'Gestión de Empleados', 
      icon: <FaUserTie />
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
          <h5 className="menu-section-title">MENÚ ADMINISTRADOR</h5>
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
              <span>A</span>
            </div>
            <div className="user-details">
              <p className="user-name">Usuario Administrador</p>
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

export default AdminLayout; 