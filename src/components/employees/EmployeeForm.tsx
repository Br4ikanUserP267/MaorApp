import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface EmployeeFormProps {
  onSubmit: (employeeData: any) => void;
  isLoading?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    // Datos del empleado
    name: '',
    email: '',
    phone: '',
    country_code: '',
    address: '',
    identification_number: '',
    hire_date: '',
    birth_date: '',
    is_active: true,
    // Datos de usuario/credenciales
    password: '',
    role: 'employee', // Por defecto será empleado
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData(prev => ({
      ...prev,
      phone: value,
      country_code: country.countryCode.toUpperCase()
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      employee: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country_code: formData.country_code,
        address: formData.address,
        identification_number: formData.identification_number,
        hire_date: formData.hire_date,
        birth_date: formData.birth_date,
        is_active: formData.is_active
      },
      user: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: true
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-primary">
        <FaUserTie className="me-2" />
        Registrar Nuevo Empleado
      </h3>

      <Row className="g-3">
        {/* Información Personal */}
        <Col xs={12}>
          <h5 className="border-bottom pb-2">Información Personal</h5>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre completo"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Número de Identificación *</Form.Label>
            <Form.Control
              type="text"
              name="identification_number"
              value={formData.identification_number}
              onChange={handleChange}
              required
              placeholder="Ingrese el número de identificación"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <PhoneInput
              country={'co'} // Por defecto Colombia
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="form-control"
              containerClass="phone-input"
              buttonClass="phone-button"
              dropdownClass="phone-dropdown"
              searchClass="phone-search"
              enableSearch={true}
              searchPlaceholder="Buscar país..."
              placeholder="Ingrese el número de teléfono"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Contratación *</Form.Label>
            <Form.Control
              type="date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ingrese la dirección completa"
              rows={2}
            />
          </Form.Group>
        </Col>

        {/* Información de Usuario */}
        <Col xs={12}>
          <h5 className="border-bottom pb-2 mt-3">Información de Acceso</h5>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Rol *</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Administrador</option>
              <option value="cashier">Cajero</option>
              <option value="employee">Empleado</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingrese la contraseña"
              minLength={6}
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              label="Usuario Activo"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button 
          type="submit" 
          className="btn-maor"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Registrar Empleado'}
        </Button>
      </div>
    </Form>
  );
};

export default EmployeeForm; 