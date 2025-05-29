import { useState } from 'react';
import "../../../assets/styles/dashboard.css"
import Modales from "./gestion"
const TablasInfo = () => {
  const [activeTab, setActiveTab] = useState('productos');

  const cambiarTab = (tab: string) => setActiveTab(tab);

  const renderBotonAñadir = () => {
    const botones = {
      productos: {
        target: '#productoModal',
        texto: 'Añadir Producto',
        icono: 'fas fa-box-open'
      },
      servicios: {
        target: '#servicioModal',
        texto: 'Añadir Servicio',
        icono: 'fas fa-concierge-bell'
      },
      empleados: {
        target: '#empleadoModal',
        texto: 'Añadir Empleado',
        icono: 'fas fa-user-tie'
      },
      clientes: {
        target: '#clienteModal',
        texto: 'Añadir Cliente',
        icono: 'fas fa-user-plus'
      },
      pqrf: {
        target: '#pqrfModal',
        texto: 'Añadir PQRF',
        icono: 'fas fa-exclamation-circle'
      }
    };

    const boton = botones[activeTab];
    if (!boton) return null;

    return (
      <button className="btn btn-correjir btn-sm shadow-sm rounded-pill px-3 py-1" 
              data-bs-toggle="modal" 
              data-bs-target={boton.target}>
        <i className={`${boton.icono} me-1`}></i>{boton.texto}
      </button>
    );
  };

  const renderBotonesAccion = () => (
    <div className="d-flex justify-content-end">
      <button className="btn btn-sm btn-outline-primary rounded-pill me-1 px-2 py-0">
        <i className="fas fa-edit me-1"></i>Editar
      </button>
      <button className="btn btn-sm btn-outline-danger rounded-pill px-2 py-0">
        <i className="fas fa-trash-alt me-1"></i>Eliminar
      </button>
    </div>
  );

  return (
    <div className="container-fluid mt-3 px-4" dir="ltr">
      <style>{`
        :root {
          --correjir-primary: #8e44ad;
          --correjir-secondary: #9b59b6;
          --correjir-light: #f5eef8;
        }

        .btn-correjir {
          background-color: var(--correjir-primary);
          color: white;
          transition: all 0.3s ease;
        }

        .btn-correjir:hover {
          background-color: var(--correjir-secondary);
          color: white;
        }

        .nav-tabs .nav-link {
          color: #495057;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0 0.1rem;
          font-weight: 500;
          border-radius: 50px;
          background-color: #f8f9fa;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        .nav-tabs .nav-link.active {
          color: white;
          background-color: var(--correjir-primary);
          font-weight: bold;
        }

        .nav-tabs .nav-link:hover:not(.active) {
          background-color: var(--correjir-light);
          color: var(--correjir-primary);
        }

        .table {
          border-radius: 8px;
          overflow: hidden;
          font-size: 0.875rem;
        }

        .table thead {
          background-color: var(--correjir-light);
        }

        .table th {
          border-bottom: 2px solid var(--correjir-primary);
          padding: 0.5rem;
        }

        .table td {
          padding: 0.5rem;
          vertical-align: middle;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-circle {
          background-color: var(--correjir-light);
          color: var(--correjir-primary);
          border-radius: 50%;
          padding: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .logo-circle i {
          font-size: 1.2rem;
        }

        .card {
          border: none;
          border-radius: 0.75rem;
        }

        .card-body {
          padding: 0.75rem;
        }

        .badge {
          font-size: 0.75rem;
          padding: 0.25em 0.5em;
        }
      `}</style>

      <div className="section-header mb-3">
        <div className="logo-circle">
          <i className="fas fa-spa"></i>
        </div>
        <h4 className="mb-0" style={{fontSize: '1.25rem'}}>Panel de Gestión</h4>
      </div>

      <ul className="nav nav-tabs mb-3 justify-content-start">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => cambiarTab('productos')}
          >
            <i className="fas fa-box-open me-1"></i>Productos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'servicios' ? 'active' : ''}`}
            onClick={() => cambiarTab('servicios')}
          >
            <i className="fas fa-concierge-bell me-1"></i>Servicios
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'empleados' ? 'active' : ''}`}
            onClick={() => cambiarTab('empleados')}
          >
            <i className="fas fa-user-tie me-1"></i>Empleados
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'clientes' ? 'active' : ''}`}
            onClick={() => cambiarTab('clientes')}
          >
            <i className="fas fa-users me-1"></i>Clientes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'pqrf' ? 'active' : ''}`}
            onClick={() => cambiarTab('pqrf')}
          >
            <i className="fas fa-exclamation-circle me-1"></i>PQRF
          </button>
        </li>
      </ul>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0" style={{fontSize: '1rem'}}>
          {activeTab === 'productos' && <><i className="fas fa-box-open me-1"></i>Productos</>}
          {activeTab === 'servicios' && <><i className="fas fa-concierge-bell me-1"></i>Servicios</>}
          {activeTab === 'empleados' && <><i className="fas fa-user-tie me-1"></i>Empleados</>}
          {activeTab === 'clientes' && <><i className="fas fa-users me-1"></i>Clientes</>}
          {activeTab === 'pqrf' && <><i className="fas fa-exclamation-circle me-1"></i>PQRF</>}
        </h5>
        {renderBotonAñadir()}
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                {activeTab === 'productos' && (
                  <tr>
                    <th><i className="fas fa-barcode me-1"></i>Código</th>
                    <th><i className="fas fa-tag me-1"></i>Nombre</th>
                    <th><i className="fas fa-layer-group me-1"></i>Categoría</th>
                    <th><i className="fas fa-dollar-sign me-1"></i>Precio</th>
                    <th><i className="fas fa-boxes me-1"></i>Stock</th>
                    <th><i className="fas fa-info-circle me-1"></i>Estado</th>
                    <th><i className="fas fa-cog me-1"></i>Acciones</th>
                  </tr>
                )}
                {activeTab === 'servicios' && (
                  <tr>
                    <th><i className="fas fa-id-badge me-1"></i>ID</th>
                    <th><i className="fas fa-tag me-1"></i>Nombre</th>
                    <th><i className="fas fa-clock me-1"></i>Duración</th>
                    <th><i className="fas fa-dollar-sign me-1"></i>Precio</th>
                    <th><i className="fas fa-layer-group me-1"></i>Categoría</th>
                    <th><i className="fas fa-cog me-1"></i>Acciones</th>
                  </tr>
                )}
                {activeTab === 'empleados' && (
                  <tr>
                    <th><i className="fas fa-id-card me-1"></i>Cédula</th>
                    <th><i className="fas fa-user me-1"></i>Nombre</th>
                    <th><i className="fas fa-briefcase me-1"></i>Cargo</th>
                    <th><i className="fas fa-star me-1"></i>Especialidad</th>
                    <th><i className="fas fa-phone me-1"></i>Teléfono</th>
                    <th><i className="fas fa-cog me-1"></i>Acciones</th>
                  </tr>
                )}
                {activeTab === 'clientes' && (
                  <tr>
                    <th><i className="fas fa-id-card me-1"></i>Documento</th>
                    <th><i className="fas fa-user me-1"></i>Nombre</th>
                    <th><i className="fas fa-phone me-1"></i>Teléfono</th>
                    <th><i className="fas fa-envelope me-1"></i>Correo</th>
                    <th><i className="fas fa-calendar-alt me-1"></i>Última Visita</th>
                    <th><i className="fas fa-cog me-1"></i>Acciones</th>
                  </tr>
                )}
                {activeTab === 'pqrf' && (
                  <tr>
                    <th><i className="fas fa-id-badge me-1"></i>ID</th>
                    <th><i className="fas fa-tag me-1"></i>Tipo</th>
                    <th><i className="fas fa-user me-1"></i>Cliente</th>
                    <th><i className="fas fa-comment me-1"></i>Descripción</th>
                    <th><i className="fas fa-calendar me-1"></i>Fecha</th>
                    <th><i className="fas fa-cog me-1"></i>Acciones</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeTab === 'productos' && (
                  <>
                    <tr>
                      <td>PROD-001</td>
                      <td>Crema Hidratante</td>
                      <td>Facial</td>
                      <td>$85,000</td>
                      <td>15 <span className="badge bg-warning">Bajo</span></td>
                      <td><span className="badge bg-success">Activo</span></td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                    <tr>
                      <td>PROD-002</td>
                      <td>Serum Revitalizante</td>
                      <td>Facial</td>
                      <td>$120,000</td>
                      <td>8 <span className="badge bg-danger">Crítico</span></td>
                      <td><span className="badge bg-success">Activo</span></td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                  </>
                )}
                {activeTab === 'servicios' && (
                  <>
                    <tr>
                      <td>SERV-001</td>
                      <td>Facial Anti-Edad</td>
                      <td>60 min</td>
                      <td>$150,000</td>
                      <td>Facial</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                    <tr>
                      <td>SERV-002</td>
                      <td>Depilación Láser</td>
                      <td>30 min</td>
                      <td>$200,000</td>
                      <td>Depilación</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                  </>
                )}
                {activeTab === 'empleados' && (
                  <>
                    <tr>
                      <td>123456789</td>
                      <td>Laura Martínez</td>
                      <td>Esteticista</td>
                      <td>Faciales</td>
                      <td>3001234567</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                    <tr>
                      <td>987654321</td>
                      <td>Carolina Gómez</td>
                      <td>Masajista</td>
                      <td>Masajes</td>
                      <td>3109876543</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                  </>
                )}
                {activeTab === 'clientes' && (
                  <>
                    <tr>
                      <td>1023456789</td>
                      <td>María González</td>
                      <td>3001234567</td>
                      <td>maria@example.com</td>
                      <td>15/06/2023</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                    <tr>
                      <td>987654321</td>
                      <td>Ana López</td>
                      <td>3109876543</td>
                      <td>ana@example.com</td>
                      <td>10/06/2023</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                  </>
                )}
                {activeTab === 'pqrf' && (
                  <>
                    <tr>
                      <td>PQRF-001</td>
                      <td>Reclamo</td>
                      <td>María González</td>
                      <td>Producto defectuoso</td>
                      <td>15/06/2023</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                    <tr>
                      <td>PQRF-002</td>
                      <td>Petición</td>
                      <td>Ana López</td>
                      <td>Solicitud descuento</td>
                      <td>10/06/2023</td>
                      <td>{renderBotonesAccion()}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablasInfo;