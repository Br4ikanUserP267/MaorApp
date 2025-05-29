import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaHandHoldingHeart, FaBoxOpen, 
         FaUserTie, FaFileInvoiceDollar, FaChartBar, FaExclamationCircle, 
         FaCashRegister, FaClipboardList, FaUserClock, FaFileInvoice } from 'react-icons/fa';

interface MenuItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

interface StaffMenuProps {
  role: 'admin' | 'cashier' | 'employee';
  userName: string;
  userRole: string;
  userAvatar?: string;
}

const adminMenuItems: MenuItem[] = [
  { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { path: '/admin/clients', icon: <FaUsers />, label: 'Clientes' },
  { path: '/admin/appointments', icon: <FaCalendarAlt />, label: 'Citas' },
  { path: '/admin/services', icon: <FaHandHoldingHeart />, label: 'Servicios' },
  { path: '/admin/products', icon: <FaBoxOpen />, label: 'Productos' },
  { path: '/admin/employees', icon: <FaUserTie />, label: 'Empleados' },
  { path: '/admin/sales', icon: <FaFileInvoiceDollar />, label: 'Ventas' },
  { path: '/admin/reports', icon: <FaChartBar />, label: 'Reportes' },
  { path: '/admin/pqrf', icon: <FaExclamationCircle />, label: 'PQRF' }
];

const cashierMenuItems: MenuItem[] = [
  { path: '/cashier/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { path: '/cashier/sales', icon: <FaCashRegister />, label: 'Ventas' },
  { path: '/cashier/appointments', icon: <FaCalendarAlt />, label: 'Citas' },
  { path: '/cashier/clients', icon: <FaUsers />, label: 'Clientes' },
  { path: '/cashier/inventory', icon: <FaClipboardList />, label: 'Inventario' },
  { path: '/cashier/shifts', icon: <FaUserClock />, label: 'Turnos' }
];

const employeeMenuItems: MenuItem[] = [
  { path: '/employee/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { path: '/employee/appointments', icon: <FaCalendarAlt />, label: 'Citas' },
  { path: '/employee/local-clients', icon: <FaUsers />, label: 'Clientes en Local' },
  { path: '/employee/invoices', icon: <FaFileInvoice />, label: 'Facturas' }
];

const StaffMenu: React.FC<StaffMenuProps> = ({ role, userName, userRole, userAvatar }) => {
  const location = useLocation();
  const menuItems = role === 'admin' 
    ? adminMenuItems 
    : role === 'cashier'
    ? cashierMenuItems
    : employeeMenuItems;

  const getRoleTitle = () => {
    switch(role) {
      case 'admin':
        return 'MENÚ ADMINISTRADORA';
      case 'cashier':
        return 'MENÚ CAJERO';
      case 'employee':
        return 'MENÚ ESTILISTA';
      default:
        return 'MENÚ';
    }
  };

  return (
    <div className="staff-sidebar">
      <div className="staff-brand">
        <h2><i className="fas fa-spa me-2"></i>MAOR</h2>
        <p>Centro de Belleza - Sincelejo</p>
      </div>

      <div className="menu-section">
        <div className="menu-section-title">
          {getRoleTitle()}
        </div>
        <div className="staff-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="user-info">
        <div className="user-info-content">
          <img
            src={userAvatar || 'https://via.placeholder.com/40'}
            alt={userName}
            className="user-avatar"
          />
          <div className="user-details">
            <p className="user-name">{userName}</p>
            <p className="user-role">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMenu; 