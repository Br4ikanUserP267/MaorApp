import React from 'react';

const ReportsPage: React.FC = () => {
  return (
    <div className="main-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2><i className="fas fa-chart-bar me-2"></i>Reportes y Estadísticas</h2>
          <p className="text-muted mb-0">Análisis y métricas del negocio</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Contenido de reportes en desarrollo...</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 