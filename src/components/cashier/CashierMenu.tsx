import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';
import '../../assets/styles/menu.css';

const CashierMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/cashier/clients',
      icon: <FaUsers />,
      label: 'Clientes',
      description: 'Gestión de clientes'
    },
    {
      path: '/cashier/local-clients',
      icon: <FaUsers />,
      label: 'Clientes en Local',
      description: 'Clientes actualmente en el local'
    },
    {
      path: '/cashier/appointments',
      icon: <FaCalendarAlt />,
      label: 'Gestión de Citas',
      description: 'Administrar citas y horarios'
    }
  ];

  return (
    <div className="sidebar vh-100 p-3" style={{ width: '220px', position: 'fixed', left: 0, top: 0 }}>
      <div className="text-center mb-4 pt-3">
        <h2><i className="fas fa-spa me-2"></i>MAOR</h2>
        <p className="small mb-0">Centro de Belleza - Sincelejo</p>
        <hr className="bg-light" />
        <div className="text-start mt-4">
          <h5 className="text-white-50 mb-3"><small>MENÚ CAJERO</small></h5>
          <ul className="nav flex-column">
            {menuItems.map((item, index) => (
              <li className="nav-item mb-2" key={index}>
                <Link
                  to={item.path}
                  className={`nav-link text-white sidebar-item p-2 ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                  <small className="d-block text-white-50">{item.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="d-flex align-items-center p-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px' }}>
        <img src="https://via.placeholder.com/40" className="rounded-circle me-2" alt="Usuario" />
        <div>
          <small className="d-block">Usuario Cajero</small>
          <small className="text-white-50">Cajero Principal</small>
        </div>
      </div>
    </div>
  );
};

export default CashierMenu; 