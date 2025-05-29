import ClientsCrud from '../../../components/admin/clients/clientes';
import BasePage from '../../../components/admin/base/BasePage';
import "../../../assets/styles/dashboard.css"

const Dashboard = () => {
  return (
    <BasePage title="Clientes">
      <ClientsCrud />
    </BasePage>
  );
};

export default Dashboard;