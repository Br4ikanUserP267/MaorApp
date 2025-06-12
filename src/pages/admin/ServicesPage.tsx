import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Card, Table, Badge, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import { FaConciergeBell, FaCut, FaPlus, FaEdit, FaTrash, FaTags } from 'react-icons/fa';
import ServiceForm from '../../components/services/ServiceForm';
import CategoryForm from '../../components/products/CategoryForm';

interface Service {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_taxable: boolean;
  tax_rate: number;
  category_id: number;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  parent_id?: number;
  is_active: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewCategories, setViewCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadServices();
    loadCategories();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Error al cargar servicios');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/service-categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Error al cargar categorías');
    }
  };

  const getCategoryColor = (categoryId?: number) => {
    const colors = ['#8e44ad', '#2ecc71', '#e74c3c', '#f39c12', '#3498db', '#1abc9c', '#d35400', '#c0392b'];
    if (!categoryId) return colors[0];
    return colors[categoryId % colors.length];
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  const handleSaveService = async (serviceData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = currentService ? `${API_URL}/services/${currentService.id}` : `${API_URL}/services`;
      const method = currentService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        await loadServices();
        setShowServiceModal(false);
        setSuccess(currentService ? 'Servicio actualizado' : 'Servicio creado');
        setCurrentService(null);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error saving service:', error);
      setError(`Error al ${currentService ? 'actualizar' : 'crear'} servicio`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCategory = async (categoryData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = currentCategory ? `${API_URL}/service-categories/${currentCategory.id}` : `${API_URL}/service-categories`;
      const method = currentCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        await loadCategories();
        setShowCategoryModal(false);
        setSuccess(currentCategory ? 'Categoría actualizada' : 'Categoría creada');
        setCurrentCategory(null);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setError(`Error al ${currentCategory ? 'actualizar' : 'crear'} categoría`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: 'service' | 'category', id: number) => {
    if (!window.confirm(`¿Estás seguro de eliminar este ${type === 'service' ? 'servicio' : 'categoría'}?`)) return;

    setIsLoading(true);
    setError(null);

    try {
      const url = type === 'service' ? `${API_URL}/services/${id}` : `${API_URL}/service-categories/${id}`;
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        type === 'service' ? await loadServices() : await loadCategories();
        setSuccess(`${type === 'service' ? 'Servicio' : 'Categoría'} eliminado`);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      setError(`Error al eliminar ${type === 'service' ? 'servicio' : 'categoría'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditService = async (service: Service) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/services/${service.id}`);
      if (!response.ok) throw new Error('Error al obtener el servicio');
      const data = await response.json();
      setCurrentService(data);
      setShowServiceModal(true);
    } catch (error) {
      console.error('Error al cargar datos del servicio:', error);
      setError('No se pudo cargar la información del servicio.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = async (category: Category) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/service-categories/${category.id}`);
      if (!response.ok) throw new Error('Error al obtener la categoría');
      const data = await response.json();
      setCurrentCategory(data);
      setShowCategoryModal(true);
    } catch (error) {
      console.error('Error al cargar datos de la categoría:', error);
      setError('No se pudo cargar la información de la categoría.');
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  const handleNewService = () => {
    setCurrentService(null);
    setShowServiceModal(true);
  };

  const handleNewCategory = () => {
    setCurrentCategory(null);
    setShowCategoryModal(true);
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center mb-4">
        <div className="me-3">
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
            <FaConciergeBell size={24} />
          </div>
        </div>
        <div>
          <h4 className="mb-0">Gestión de Servicios y Categorías</h4>
          <p className="text-muted mb-0">Administra los servicios y categorías del centro</p>
        </div>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {viewCategories ? <FaTags className="me-2" /> : <FaCut className="me-2" />}
            <span>{viewCategories ? 'Lista de Categorías' : 'Lista de Servicios'}</span>
          </div>
          <div className="d-flex gap-2">
            <DropdownButton variant="outline-info" title={viewCategories ? 'Categorías' : 'Servicios'}>
              <Dropdown.Item onClick={() => setViewCategories(!viewCategories)}>
                {viewCategories ? 'Mostrar Servicios' : 'Mostrar Categorías'}
              </Dropdown.Item>
            </DropdownButton>
            {viewCategories ? (
              <Button variant="primary" onClick={handleNewCategory}>
                <FaPlus className="me-2" /> Nueva Categoría
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNewService}>
                <FaPlus className="me-2" /> Nuevo Servicio
              </Button>
            )}
          </div>
        </Card.Header>

        <Card.Body>
          {viewCategories ? (
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description || 'Sin descripción'}</td>
                    <td>
                      <Badge bg={category.is_active ? 'success' : 'secondary'}>
                        {category.is_active ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditCategory(category)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete('category', category.id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Duración</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td>{service.code}</td>
                    <td>{service.name}</td>
                    <td>
                      <Badge style={{ backgroundColor: getCategoryColor(service.category_id) }}>
                        {getCategoryName(service.category_id)}
                      </Badge>
                    </td>
                    <td>{service.duration_minutes} min</td>
                    <td className="text-end">${parseFloat(service.price.toString()).toLocaleString()}</td>
                    <td className="text-center">
                      <Badge bg={service.is_active ? 'success' : 'danger'}>
                        {service.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditService(service)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete('service', service.id)}>
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

      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentService ? 'Editar Servicio' : 'Nuevo Servicio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm
            onSubmit={handleSaveService}
            isLoading={isLoading}
            categories={categoryOptions}
            initialData={currentService}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory ? 'Editar Categoría' : 'Nueva Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            onSubmit={handleSaveCategory}
            isLoading={isLoading}
            categories={categoryOptions}
            type="service"
            initialData={currentCategory}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServicesPage;
