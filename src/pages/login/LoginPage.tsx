import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { FaUser, FaLock, FaSpinner, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

// Usuarios por defecto para pruebas
const DEFAULT_USERS = [
  {
    email: 'admin@maor.com',
    password: 'admin123',
    role: 'admin',
    name: 'Administrador'
  },
  {
    email: 'estilista@maor.com',
    password: 'estilista123',
    role: 'employee',
    name: 'Estilista'
  },
  {
    email: 'cajero@maor.com',
    password: 'cajero123',
    role: 'cashier',
    name: 'Cajero'
  }
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Buscar usuario
      const user = DEFAULT_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      // Guardar información de autenticación
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.name);

      // Redirigir según el rol
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'employee':
          navigate('/employee/dashboard');
          break;
        case 'cashier':
          navigate('/cashier/dashboard');
          break;
        default:
          setError('Rol no válido');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (user: typeof DEFAULT_USERS[0]) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="login-card">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h1 className="brand-name">MAOR</h1>
              <p className="brand-description">Sistema de Gestión de Belleza</p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 login-button" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spinner me-2" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>

              <div className="text-center mt-4">
                <Button
                  variant="link"
                  className="show-credentials-button"
                  onClick={() => setShowCredentials(!showCredentials)}
                >
                  <FaInfoCircle className="me-2" />
                  {showCredentials ? 'Ocultar credenciales' : 'Mostrar credenciales de prueba'}
                </Button>
              </div>

              {showCredentials && (
                <div className="credentials-info mt-4">
                  <h6 className="text-center mb-3">Usuarios de prueba</h6>
                  <Row className="g-3">
                    {DEFAULT_USERS.map((user) => (
                      <Col key={user.role} xs={12}>
                        <div 
                          className="credential-card"
                          onClick={() => handleQuickLogin(user)}
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>{user.name}</strong>
                            <Badge bg="info">{user.role}</Badge>
                          </div>
                          <div className="credential-details">
                            <small>Email: {user.email}</small>
                            <br />
                            <small>Contraseña: {user.password}</small>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage; 