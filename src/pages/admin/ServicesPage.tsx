import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import ServiceForm from '../../components/services/ServiceForm';
import ServiceList from '../../components/services/ServiceList';
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
  category?: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  description?: string;
  parent_id?: number;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadServices();
    loadCategories();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/service-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCreateService = async (serviceData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      
      if (response.ok) {
        await loadServices();
        setShowServiceModal(false);
      } else {
        throw new Error('Failed to create service');
      }
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/service-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (response.ok) {
        await loadCategories();
        setShowCategoryModal(false);
      } else {
        throw new Error('Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditService = async (service: Service) => {
    // Implement edit functionality
  };

  const handleDeleteService = async (service: Service) => {
    if (window.confirm(`¿Está seguro de eliminar el servicio "${service.name}"?`)) {
      try {
        const response = await fetch(`/api/services/${service.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await loadServices();
        } else {
          throw new Error('Failed to delete service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Gestión de Servicios</h2>
          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              onClick={() => setShowServiceModal(true)}
            >
              <FaPlus className="me-2" />
              Nuevo Servicio
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={() => setShowCategoryModal(true)}
            >
              <FaPlus className="me-2" />
              Nueva Categoría
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <ServiceList 
            services={services}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        </Col>
      </Row>

      {/* Modal for new service */}
      <Modal
        show={showServiceModal}
        onHide={() => setShowServiceModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm
            onSubmit={handleCreateService}
            isLoading={isLoading}
            categories={categoryOptions}
          />
        </Modal.Body>
      </Modal>

      {/* Modal for new category */}
      <Modal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nueva Categoría de Servicios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            onSubmit={handleCreateCategory}
            isLoading={isLoading}
            categories={categoryOptions}
            type="service"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServicesPage; 