import React, { PropsWithChildren } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Layouts
import StaffLayout from './components/staff/layout/StaffLayout';
import CashierLayout from './components/cashier/layout/CashierLayout';

// Pages
import LoginPage from './pages/login/LoginPage';
import AdminDashboard from './pages/admin/AdminPage';
import AppointmentsPage from './pages/admin/AppointmentsPage';
import EmployeesPage from './pages/admin/EmployeesPage';
import SalesPage from './pages/admin/SalesPage';
import ProductsPage from './pages/admin/ProductsPage';
import ServicesPage from './pages/admin/ServicesPage';
import CustomersPage from './pages/admin/CustomersPage';
import ReportsPage from './pages/admin/ReportsPage';
import PQRFPage from './pages/admin/PQRFPage';
import CashierDashboard from './pages/cashier/CashierDashboard';
import CashierSalesPage from './pages/cashier/sales/SalesPage';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import InvoicePage from './pages/employee/InvoicePage';
import LocalClientsPage from './pages/cashier/LocalClientsPage';
import EmployeeLocalClientsPage from './pages/employee/LocalClientsPage';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/global.css';
import './assets/styles/menu.css';
import './assets/styles/localClients.css';

const ROLES = {
  ADMIN: 'admin',
  CASHIER: 'cashier',
  EMPLOYEE: 'employee'
} as const;

type UserRole = typeof ROLES[keyof typeof ROLES];

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const DEFAULT_USERS = [
  {
    email: 'admin@maor.com',
    password: 'admin123',
    role: 'admin',
    name: 'Administrador'
  },
  {
    email: 'estilista@maor.com',
    password: 'estilista123',
    role: 'employee',
    name: 'Estilista'
  },
  {
    email: 'cajero@maor.com',
    password: 'cajero123',
    role: 'cashier',
    name: 'Cajero'
  }
];

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const user = DEFAULT_USERS.find(u => u.email === userEmail);
  const userRole = user?.role as UserRole | null;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/unauthorized" element={<div>No autorizado</div>} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <StaffLayout role="admin">
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="appointments" element={<AppointmentsPage />} />
                  <Route path="employees" element={<EmployeesPage />} />
                  <Route path="sales" element={<SalesPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="pqrf" element={<PQRFPage />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </StaffLayout>
            </ProtectedRoute>
          }
        />

        {/* Cashier Routes */}
        <Route
          path="/cashier/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CASHIER]}>
              <CashierLayout>
                <Routes>
                  <Route path="dashboard" element={<CashierDashboard />} />
                  <Route path="appointments" element={<AppointmentsPage />} />
                  <Route path="local-clients" element={<LocalClientsPage />} />
                  <Route path="sales" element={<CashierSalesPage />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </CashierLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}>
              <StaffLayout role="employee">
                <Routes>
                  <Route path="dashboard" element={<EmployeeDashboard />} />
                  <Route path="appointments" element={<AppointmentsPage />} />
                  <Route path="local-clients" element={<EmployeeLocalClientsPage />} />
                  <Route path="invoices" element={<InvoicePage />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </StaffLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;