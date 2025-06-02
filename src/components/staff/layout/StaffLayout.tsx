import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../admin/layout/AdminLayout';
import '../../../assets/styles/staff-layout.css';

interface StaffLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'cashier' | 'employee';
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children, role }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (role === 'admin') {
    return <AdminLayout>{children}</AdminLayout>;
  }

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
        {/* Aquí iría el menú para otros roles */}
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