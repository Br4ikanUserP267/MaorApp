import React, { useState } from 'react';
import { Table, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaUserPlus } from 'react-icons/fa';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
  status: 'active' | 'inactive';
}

const AllClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example data - replace with actual API call
  const clients: Client[] = [
    {
      id: 1,
      name: 'Ana García',
      email: 'ana.garcia@email.com',
      phone: '300-123-4567',
      lastVisit: '2024-03-15',
      totalVisits: 8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '301-234-5678',
      lastVisit: '2024-03-10',
      totalVisits: 5,
      status: 'active'
    },
    // Add more example clients here
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div>
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="primary" className="btn-correjir">
            <FaUserPlus className="me-2" />
            Nuevo Cliente
          </Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Última Visita</th>
            <th>Total Visitas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.lastVisit}</td>
              <td>{client.totalVisits}</td>
              <td>
                <span className={`badge bg-${client.status === 'active' ? 'success' : 'danger'}`}>
                  {client.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <Button variant="link" className="text-primary me-2 p-0">
                  Editar
                </Button>
                <Button variant="link" className="text-danger p-0">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllClients; 