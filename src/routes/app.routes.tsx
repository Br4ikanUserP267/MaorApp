import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CashierDashboard from '../pages/cashier/CashierDashboard';
import ClientsPage from '../pages/cashier/ClientsPage';
import LocalClientsPage from '../pages/cashier/LocalClientsPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import LoginPage from '../pages/auth/LoginPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Cashier Routes */}
      <Route path="/cashier" element={<ProtectedRoute role="cashier" />}>
        <Route index element={<CashierDashboard />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="local-clients" element={<LocalClientsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<ProtectedRoute role="employee" />}>
        <Route index element={<EmployeeDashboard />} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
