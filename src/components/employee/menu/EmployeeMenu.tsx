import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome,
  FaCalendarAlt, 
  FaUsers, 
  FaWhatsapp,
  FaFileInvoice,
  FaUserCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useState } from 'react';
import '../../../assets/styles/menus/employee-menu.css';

const EmployeeMenu = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: 'Inicio',
      icon: <FaHome />,
      path: '/employee/dashboard',
      description: 'Panel principal'
    },
    { 
      name: 'Mis Citas', 
      icon: <FaCalendarAlt />,
      path: '/employee/appointments',
      description: 'Gestión de citas'
    },
    { 
      name: 'Mis Clientes', 
      icon: <FaUsers />,
      path: '/employee/customers',
      description: 'Lista de clientes'
    },
    { 
      name: 'Facturación', 
      icon: <FaFileInvoice />,
      path: '/employee/invoices',
      description: 'Gestión de facturas'
    }
  ];

  const handleWhatsAppClick = (phoneNumber: string) => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <>
      <header className="employee-header">
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className="user-actions">
          <button 
            className="action-button whatsapp"
            onClick={() => handleWhatsAppClick('1234567890')}
            aria-label="Abrir WhatsApp"
          >
            <FaWhatsapp size={20} />
          </button>
          <button className="action-button profile" aria-label="Perfil">
            <FaUserCircle size={20} />
            <span className="profile-text">Mi Perfil</span>
          </button>
        </div>
      </header>

      <nav className={`employee-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>MAOR App</h2>
          <p>Panel de Estilista</p>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
              title={item.description}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="menu-footer">
          <div className="user-info">
            <FaUserCircle size={32} />
            <div className="user-details">
              <h6>Estilista</h6>
              <p>María González</p>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default EmployeeMenu; 