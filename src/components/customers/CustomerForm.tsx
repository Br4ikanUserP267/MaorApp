import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { FaUserPlus } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Municipios de Sucre
const MUNICIPIOS_SUCRE = [
  { value: 'sincelejo', label: 'Sincelejo' },
  { value: 'covenas', label: 'Coveñas' },
  { value: 'santiago_de_tolu', label: 'Santiago de Tolú' },
  { value: 'sampues', label: 'Sampués' },
  { value: 'san_marcos', label: 'San Marcos' },
  { value: 'since', label: 'Sincé' },
  { value: 'tolu_viejo', label: 'Tolú Viejo' },
  { value: 'san_onofre', label: 'San Onofre' },
  { value: 'majagual', label: 'Majagual' },
  { value: 'sucre', label: 'Sucre' },
  { value: 'morroa', label: 'Morroá' },
  { value: 'coloso', label: 'Colosó' },
  { value: 'chalán', label: 'Chalán' },
  { value: 'ovejas', label: 'Ovejas' },
  { value: 'los_palmitos', label: 'Los Palmitos' },
  { value: 'san_pedro', label: 'San Pedro' },
  { value: 'san_juan_de_betulia', label: 'San Juan de Betulia' },
  { value: 'el_roble', label: 'El Roble' },
  { value: 'galeras', label: 'Galeras' },
  { value: 'la_union', label: 'La Unión' },
  { value: 'san_benito_abad', label: 'San Benito Abad' },
  { value: 'guaranda', label: 'Guaranda' },
  { value: 'palmito', label: 'Palmito' },
  { value: 'caimito', label: 'Caimito' },
  { value: 'buenavista', label: 'Buenavista' },
  { value: 'san_luis_de_since', label: 'San Luis de Sincé' }
];

interface CustomerFormProps {
  onSubmit: (customerData: any) => void;
  isLoading?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country_code: '',
    municipio: null,
    barrio: '',
    direccion_detallada: '',
    address: '',
    identification_number: '',
    birth_date: '',
    // Nuevos campos para dirección fuera de Sucre
    otro_departamento: '',
    otro_municipio: '',
    es_sucre: true // Por defecto es Sucre
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMunicipioChange = (option: any) => {
    setFormData(prev => ({
      ...prev,
      municipio: option,
      address: generarDireccionCompleta({ ...prev, municipio: option })
    }));
  };

  const generarDireccionCompleta = (data: any) => {
    const partes = [];
    if (data.direccion_detallada) partes.push(data.direccion_detallada);
    if (data.barrio) partes.push(`Barrio ${data.barrio}`);
    
    if (data.es_sucre) {
      if (data.municipio?.label) partes.push(data.municipio.label);
      partes.push('Sucre, Colombia');
    } else {
      if (data.otro_municipio) partes.push(data.otro_municipio);
      if (data.otro_departamento) partes.push(data.otro_departamento);
      partes.push('Colombia');
    }
    
    return partes.join(', ');
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
      ...formData,
      address: generarDireccionCompleta(formData),
      is_active: true,
      loyalty_points: 0
    });
  };

  const toggleUbicacion = () => {
    setFormData(prev => ({
      ...prev,
      es_sucre: !prev.es_sucre,
      municipio: null,
      otro_departamento: '',
      otro_municipio: ''
    }));
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-primary">
        <FaUserPlus className="me-2" />
        Registrar Nuevo Cliente
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
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono *</Form.Label>
            <PhoneInput
              country={'co'}
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
              required
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

        {/* Información de Ubicación */}
        <Col xs={12}>
          <h5 className="border-bottom pb-2 mt-3">Información de Ubicación</h5>
          <Form.Check
            type="switch"
            id="ubicacion-switch"
            label={formData.es_sucre ? "Cliente en Sucre" : "Cliente fuera de Sucre"}
            checked={formData.es_sucre}
            onChange={toggleUbicacion}
            className="mb-3"
          />
        </Col>

        {formData.es_sucre ? (
          // Campos para Sucre
          <>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Municipio de Sucre *</Form.Label>
                <Select
                  options={MUNICIPIOS_SUCRE}
                  value={formData.municipio}
                  onChange={handleMunicipioChange}
                  placeholder="Seleccione un municipio"
                  className="select-municipio"
                  required
                />
              </Form.Group>
            </Col>
          </>
        ) : (
          // Campos para otros departamentos
          <>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Departamento *</Form.Label>
                <Form.Control
                  type="text"
                  name="otro_departamento"
                  value={formData.otro_departamento}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData(prev => ({
                      ...prev,
                      otro_departamento: e.target.value,
                      address: generarDireccionCompleta({ ...prev, otro_departamento: e.target.value })
                    }));
                  }}
                  required
                  placeholder="Ej: Bolívar"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Municipio *</Form.Label>
                <Form.Control
                  type="text"
                  name="otro_municipio"
                  value={formData.otro_municipio}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData(prev => ({
                      ...prev,
                      otro_municipio: e.target.value,
                      address: generarDireccionCompleta({ ...prev, otro_municipio: e.target.value })
                    }));
                  }}
                  required
                  placeholder="Ej: Cartagena"
                />
              </Form.Group>
            </Col>
          </>
        )}

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Barrio</Form.Label>
            <Form.Control
              type="text"
              name="barrio"
              value={formData.barrio}
              onChange={(e) => {
                handleChange(e);
                setFormData(prev => ({
                  ...prev,
                  barrio: e.target.value,
                  address: generarDireccionCompleta({ ...prev, barrio: e.target.value })
                }));
              }}
              placeholder="Ingrese el nombre del barrio"
            />
          </Form.Group>
        </Col>

        <Col md={formData.es_sucre ? 6 : 12}>
          <Form.Group className="mb-3">
            <Form.Label>Dirección Detallada *</Form.Label>
            <Form.Control
              type="text"
              name="direccion_detallada"
              value={formData.direccion_detallada}
              onChange={(e) => {
                handleChange(e);
                setFormData(prev => ({
                  ...prev,
                  direccion_detallada: e.target.value,
                  address: generarDireccionCompleta({ ...prev, direccion_detallada: e.target.value })
                }));
              }}
              required
              placeholder="Ej: Calle 15 #23-41"
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Dirección Completa</Form.Label>
            <Form.Control
              type="text"
              value={generarDireccionCompleta(formData)}
              disabled
              className="bg-light"
            />
            <Form.Text className="text-muted">
              Esta es la dirección completa que se guardará en el sistema
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button 
          type="submit" 
          className="btn-maor"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Registrar Cliente'}
        </Button>
      </div>
    </Form>
  );
};

export default CustomerForm; 