import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSpa, 
  FaTachometerAlt, 
  FaUsers, 
  FaCalendarAlt, 
  FaFileInvoiceDollar,
  FaBoxes,
  FaBars,
  FaCashRegister,
  FaReceipt
} from 'react-icons/fa';
import '../../../assets/styles/menus/cashier-menu.css';

const CashierMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <FaTachometerAlt />,
      path: '/cashier/dashboard',
      description: 'Panel principal'
    },
    { 
      name: 'Clientes', 
      icon: <FaUsers />,
      path: '/cashier/customers',
      description: 'Gestión de clientes'
    },
    { 
      name: 'Citas', 
      icon: <FaCalendarAlt />,
      path: '/cashier/appointments',
      description: 'Gestión de citas'
    },
    { 
      name: 'Facturas', 
      icon: <FaFileInvoiceDollar />,
      path: '/cashier/invoices',
      description: 'Gestión de facturas'
    },
    { 
      name: 'Productos', 
      icon: <FaBoxes />,
      path: '/cashier/products',
      description: 'Inventario de productos'
    }
  ];

  return (
    <>
      <button 
        className="menu-toggle d-lg-none" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </button>

      <nav className={`cashier-menu ${isMenuOpen ? 'show' : ''}`}>
        <div className="logo-container">
          <FaSpa size={24} />
          <span>MAOR Caja</span>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              title={item.description}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="quick-actions">
          <button className="btn btn-primary mb-2 w-100">
            <FaCashRegister className="me-2" />
            Nueva Venta
          </button>
          <button className="btn btn-secondary w-100">
            <FaReceipt className="me-2" />
            Cerrar Caja
          </button>
        </div>
      </nav>
    </>
  );
};

export default CashierMenu; 