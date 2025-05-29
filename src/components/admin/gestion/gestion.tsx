const Modales = () => {
  return (
    <>
      {/* MODAL PRODUCTO */}
      <div className="modal fade" id="productoModal" tabIndex={-1} aria-labelledby="productoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-white" style={{ backgroundColor: 'var(--correjir-primary)' }}>
              <h5 className="modal-title"><i className="fas fa-box-open me-2"></i>Nuevo Producto</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Código</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select className="form-select">
                    <option>Facial</option>
                    <option>Corporal</option>
                    <option>Capilar</option>
                    <option>Manos y Pies</option>
                    <option>Maquillaje</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" rows={3}></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-correjir">Guardar Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SERVICIO */}
      <div className="modal fade" id="servicioModal" tabIndex={-1} aria-labelledby="servicioModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-white" style={{ backgroundColor: 'var(--correjir-primary)' }}>
              <h5 className="modal-title"><i className="fas fa-concierge-bell me-2"></i>Nuevo Servicio</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre del Servicio</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select className="form-select">
                    <option>Facial</option>
                    <option>Masaje</option>
                    <option>Uñas</option>
                    <option>Cabello</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input type="number" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duración (minutos)</label>
                  <input type="number" className="form-control" required />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-correjir">Guardar Servicio</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EMPLEADO */}
      <div className="modal fade" id="empleadoModal" tabIndex={-1} aria-labelledby="empleadoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-white" style={{ backgroundColor: 'var(--correjir-primary)' }}>
              <h5 className="modal-title"><i className="fas fa-user me-2"></i>Nuevo Empleado</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cargo</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-correjir">Guardar Empleado</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PQRF */}
      <div className="modal fade" id="pqrfModal" tabIndex={-1} aria-labelledby="pqrfModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-white" style={{ backgroundColor: 'var(--correjir-primary)' }}>
              <h5 className="modal-title"><i className="fas fa-comment-dots me-2"></i>Nueva PQRF</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre del Cliente</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <select className="form-select">
                    <option>Petición</option>
                    <option>Queja</option>
                    <option>Reclamo</option>
                    <option>Felicitación</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-correjir">Guardar PQRF</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



      {/* MODAL CLIENTE */}
<div className="modal fade" id="clienteModal" tabIndex={-1} aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header text-white" style={{ backgroundColor: 'var(--correjir-primary)' }}>
        <h5 className="modal-title"><i className="fas fa-user-plus me-2"></i>Nuevo Cliente</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" />
      </div>
      <div className="modal-body">
        <form>
          <div className="row g-2">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre Completo</label>
              <input type="text" className="form-control form-control-sm" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Documento</label>
              <input type="text" className="form-control form-control-sm" required />
            </div>
          </div>
          <div className="row g-2">
            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-control form-control-sm" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control form-control-sm" />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control form-control-sm" />
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button type="button" className="btn btn-sm btn-outline-secondary me-2" data-bs-dismiss="modal">
              <i className="fas fa-times me-1"></i>Cancelar
            </button>
            <button type="submit" className="btn btn-sm btn-correjir">
              <i className="fas fa-save me-1"></i>Guardar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Modales;
