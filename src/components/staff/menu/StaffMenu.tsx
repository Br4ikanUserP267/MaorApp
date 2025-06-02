import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaCalendarAlt, FaUsers, FaChartLine } from 'react-icons/fa';
import './StaffMenu.css';

interface StaffMenuProps {
  role?: 'admin' | 'cashier' | 'employee';
}

const StaffMenu: React.FC<StaffMenuProps> = ({ role = 'employee' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría la lógica de logout (limpiar tokens, etc.)
    navigate('/login');
  };

  const getMenuTitle = () => {
    switch (role) {
      case 'admin':
        return 'MENÚ ADMINISTRADOR';
      case 'cashier':
        return 'MENÚ CAJERO';
      case 'employee':
        return 'MENÚ EMPLEADO';
      default:
        return 'MENÚ';
    }
  };

  const getUserInfo = () => {
    switch (role) {
      case 'admin':
        return {
          name: 'Usuario Administrador',
          role: 'Administrador Principal'
        };
      case 'cashier':
        return {
          name: 'Usuario Cajero',
          role: 'Cajero Principal'
        };
      case 'employee':
        return {
          name: 'Usuario Estilista',
          role: 'Estilista Principal'
        };
      default:
        return {
          name: 'Usuario',
          role: 'Empleado'
        };
    }
  };

  const getMenuItems = () => {
    switch (role) {
      case 'cashier':
        return [
          { path: '/cashier/dashboard', icon: <FaChartLine />, label: 'Dashboard' },
          { path: '/cashier/sales', icon: <FaShoppingCart />, label: 'Ventas' },
          { path: '/cashier/appointments', icon: <FaCalendarAlt />, label: 'Citas' },
          { path: '/cashier/clients', icon: <FaUsers />, label: 'Clientes' }
        ];
      case 'employee':
        return [
          { path: '/employee/dashboard', icon: <FaUser />, label: 'Dashboard' },
          { path: '/employee/appointments', icon: <FaUser />, label: 'Citas' },
          { path: '/employee/clients', icon: <FaUser />, label: 'Clientes' },
          { path: '/employee/services', icon: <FaUser />, label: 'Servicios' }
        ];
      default:
        return [];
    }
  };

  const userInfo = getUserInfo();
  const menuItems = getMenuItems();

  return (
    <div className="staff-menu">
      <div className="menu-header">
        <h2>MAOR</h2>
        <p>Sistema de Gestión</p>
      </div>

      <div className="menu-section">
        <h5>{getMenuTitle()}</h5>
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.path} 
              className={`menu-item ${window.location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="user-info">
        <div className="user-avatar">
          <FaUser />
        </div>
        <div className="user-details">
          <p className="user-name">{userInfo.name}</p>
          <p className="user-role">{userInfo.role}</p>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Salir</span>
      </button>
    </div>
  );
};

export default StaffMenu; 