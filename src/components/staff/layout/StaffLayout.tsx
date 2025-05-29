import React, { useState } from 'react';
import StaffMenu from '../menu/StaffMenu';
import '../../../assets/styles/staff-layout.css';

interface StaffLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'cashier' | 'employee';
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children, role }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data - in a real app, this would come from authentication context
  const userData = {
    userName: role === 'admin' 
      ? 'Usuario Administrador' 
      : role === 'cashier'
      ? 'Usuario Cajero'
      : 'Usuario Estilista',
    userRole: role === 'admin' 
      ? 'Administradora Principal' 
      : role === 'cashier'
      ? 'Cajero Principal'
      : 'Estilista Principal',
    userAvatar: 'https://via.placeholder.com/40'
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="staff-layout">
      <button 
        className="menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className={`staff-sidebar ${isMobileMenuOpen ? 'show' : ''}`}>
        <StaffMenu
          role={role}
          userName={userData.userName}
          userRole={userData.userRole}
          userAvatar={userData.userAvatar}
        />
      </div>

      <div 
        className="staff-content" 
        onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default StaffLayout; 