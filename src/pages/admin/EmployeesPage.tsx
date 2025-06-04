import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Spinner, Modal } from 'react-bootstrap';
import { FaUserTie, FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import EmployeeForm from '../../components/employees/EmployeeForm';
import { toast } from 'react-toastify';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  identification_number: string;
  hire_date: string;
  is_active: boolean;
  role: string;
}

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // Aquí iría la llamada a tu API para obtener los empleados
      // const response = await employeeService.getEmployees();
      // setEmployees(response.data);
      
      // Datos de ejemplo
      setEmployees([
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@maor.com',
          phone: '3001234567',
          identification_number: '123456789',
          hire_date: '2023-01-15',
          is_active: true,
          role: 'admin'
        },
        // Más empleados de ejemplo...
      ]);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Error al cargar los empleados');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (data: any) => {
    try {
      setIsLoading(true);
      // Aquí irían las llamadas a las APIs para crear el empleado y el usuario
      console.log('Datos del empleado a guardar:', data);
      
      // Simular delay de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Empleado registrado exitosamente');
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error al guardar el empleado:', error);
      toast.error('Error al registrar el empleado');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este empleado?')) {
      try {
        // Aquí iría la llamada a tu API para eliminar el empleado
        // await employeeService.deleteEmployee(id);
        toast.success('Empleado eliminado exitosamente');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error('Error al eliminar el empleado');
      }
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.identification_number.includes(searchTerm);
    
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card className="admin-panel">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                  <FaUserTie className="me-2" />
                  Gestión de Empleados
                </h2>
                <Button 
                  className="btn-maor"
                  onClick={() => setShowModal(true)}
                >
                  <FaPlus className="me-2" />
                  Nuevo Empleado
                </Button>
              </div>

              <Row className="mb-4">
                <Col md={4}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Buscar empleados..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <option value="all">Todos los roles</option>
                      <option value="admin">Administrador</option>
                      <option value="cashier">Cajero</option>
                      <option value="employee">Empleado</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {loading ? (
                <div className="text-center p-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </Spinner>
                </div>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Identificación</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(employee => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.identification_number}</td>
                        <td>
                          <span className={`badge bg-${employee.role === 'admin' ? 'danger' : employee.role === 'cashier' ? 'warning' : 'info'}`}>
                            {employee.role === 'admin' ? 'Administrador' : 
                             employee.role === 'cashier' ? 'Cajero' : 'Empleado'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${employee.is_active ? 'bg-success' : 'bg-danger'}`}>
                            {employee.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => console.log('Editar', employee.id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm 
            onSubmit={handleAddEmployee}
            isLoading={isLoading}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmployeesPage; 