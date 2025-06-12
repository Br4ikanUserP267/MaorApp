import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Spinner, Modal, Badge } from 'react-bootstrap';
import { FaUserTie, FaEdit, FaTrash, FaSearch, FaPlus, FaUsers } from 'react-icons/fa';
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
          name: 'Ana García',
          email: 'ana@maor.com',
          phone: '300-123-4567',
          identification_number: '123456789',
          hire_date: '2023-01-15',
          is_active: true,
          role: 'Estilista'
        },
        {
          id: 2,
          name: 'Carlos Pérez',
          email: 'carlos@maor.com',
          phone: '300-765-4321',
          identification_number: '987654321',
          hire_date: '2023-02-20',
          is_active: false,
          role: 'Barbero'
        }
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
    <Container fluid className="py-4">
      <div className="d-flex align-items-center mb-4">
        <div className="me-3">
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle" style={{ color: 'var(--maor-primary)' }}>
            <FaUserTie size={24} />
          </div>
        </div>
        <div>
          <h4 className="mb-0">Gestión de Empleados</h4>
          <p className="text-muted mb-0">Administra el personal del centro de belleza</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaUsers className="me-2" style={{ color: 'var(--maor-primary)' }} />
              <span>Lista de Empleados</span>
            </div>
            <Button 
              variant="primary" 
              style={{ backgroundColor: 'var(--maor-primary)', borderColor: 'var(--maor-primary)' }}
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="me-2" />
              Nuevo Empleado
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
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
                  <option value="Estilista">Estilista</option>
                  <option value="Barbero">Barbero</option>
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
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td className="text-center">
                      <Badge bg={employee.is_active ? 'success' : 'danger'}>
                        {employee.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => console.log('Editar', employee.id)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

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