import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/admin/ProductsPage';
import ServicesPage from '../pages/admin/ServicesPage';
import PaymentMethodsPage from '../pages/admin/PaymentMethodsPage';
import AdminRoute from '../components/auth/AdminRoute';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <AdminRoute>
            <AdminLayout>
              <Routes>
                <Route path="products" element={<ProductsPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="payment-methods" element={<PaymentMethodsPage />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes; 