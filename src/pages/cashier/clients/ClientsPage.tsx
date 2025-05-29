import React from 'react';
import BasePage from '../../../components/cashier/base/BasePage';
import AllClients from '../../../components/cashier/clients/AllClients';

const ClientsPage: React.FC = () => {
  return (
    <BasePage title="Gestión de Clientes">
      <AllClients />
    </BasePage>
  );
};

export default ClientsPage; 