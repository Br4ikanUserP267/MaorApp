import React, { PropsWithChildren } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Layouts
import StaffLayout from './components/staff/layout/StaffLayout';
import CashierLayout from './components/cashier/layout/CashierLayout';
import EmployeeLayout from './components/employee/layout/EmployeeLayout';

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
import CashierSalesPage from './pages/cashier/SalesPage';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import LocalClientsPage from './pages/cashier/LocalClientsPage';
import EmployeeLocalClientsPage from './pages/employee/LocalClientsPage';
import ClientsPage from './pages/cashier/ClientsPage';
import PaymentMethodsPage from './pages/admin/PaymentMethodsPage';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/global.css';
import './assets/styles/menu.css';
import './assets/styles/localClients.css';
import './assets/styles/theme.css';

const ROLES = {
  ADMIN: 'admin',
  CASHIER: 'cashier',
  EMPLOYEE: 'employee'
} as const;

type UserRole = typeof ROLES[keyof typeof ROLES];

interface ProtectedRouteProps extends PropsWithChildren {
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const location = useLocation();
  const isAuthenticated = true; // Aquí iría la lógica de autenticación real
  const userRole = role; // Aquí iría la lógica para obtener el rol del usuario

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && userRole !== role) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute role={ROLES.ADMIN}>
            <StaffLayout role={ROLES.ADMIN}>
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
                <Route path="payment-methods" element={<PaymentMethodsPage />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </StaffLayout>
          </ProtectedRoute>
        } />

        {/* Cashier Routes */}
        <Route path="/cashier/*" element={
          <ProtectedRoute role={ROLES.CASHIER}>
            <CashierLayout>
              <Routes>
                <Route path="dashboard" element={<CashierDashboard />} />
                <Route path="sales" element={<CashierSalesPage />} />
                <Route path="local-clients" element={<LocalClientsPage />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="*" element={<Navigate to="/cashier/dashboard" replace />} />
              </Routes>
            </CashierLayout>
          </ProtectedRoute>
        } />

        {/* Employee Routes */}
        <Route path="/employee/*" element={
          <ProtectedRoute role={ROLES.EMPLOYEE}>
            <EmployeeLayout>
              <Routes>
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="local-clients" element={<EmployeeLocalClientsPage />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="*" element={<Navigate to="/employee/dashboard" replace />} />
              </Routes>
            </EmployeeLayout>
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;