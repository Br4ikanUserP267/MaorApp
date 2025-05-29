import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaUserCircle } from 'react-icons/fa';

const EmployeeMenu: React.FC = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="menu-header">
        <h3>MAOR</h3>
        <p>Panel de Empleado</p>
      </div>

      <Nav className="flex-column">
        <Nav.Item>
          <Link
            to="/employee/local-clients"
            className={`nav-link ${location.pathname === '/employee/local-clients' ? 'active' : ''}`}
          >
            <FaUsers className="me-2" />
            Mis Clientes
          </Link>
        </Nav.Item>
      </Nav>

      <div className="menu-footer">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <div>
            <strong>Dra. Laura Martínez</strong>
            <span>Dermatóloga</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMenu; 