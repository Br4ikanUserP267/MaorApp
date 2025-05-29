import TablasInfo from '../../../components/admin/gestion/tablas';
import MaorResponsiveMenu from '../../../components/admin/menu/menu'
import "../../../assets/styles/dashboard.css"

const Dashboard = () => {
  return (
    <div className="app-container">
      <MaorResponsiveMenu />
      <main className="main-content">
        <TablasInfo />
      </main>
    </div>
  );
};

export default Dashboard;