import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import ProductForm from '../../components/products/ProductForm';
import ProductList from '../../components/products/ProductList';
import CategoryForm from '../../components/products/CategoryForm';

interface Product {
  id: number;
  name: string;
  stock: number;
  cost: number;
  price: number;
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

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/product-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCreateProduct = async (productData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (response.ok) {
        await loadProducts();
        setShowProductModal(false);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/product-categories', {
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

  const handleEditProduct = async (product: Product) => {
    // Implement edit functionality
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
      try {
        const response = await fetch(`/api/products/${product.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await loadProducts();
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
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
          <h2 className="mb-4">Gestión de Productos</h2>
          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              onClick={() => setShowProductModal(true)}
            >
              <FaPlus className="me-2" />
              Nuevo Producto
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
          <ProductList 
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </Col>
      </Row>

      {/* Modal for new product */}
      <Modal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            onSubmit={handleCreateProduct}
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
          <Modal.Title>Nueva Categoría de Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            onSubmit={handleCreateCategory}
            isLoading={isLoading}
            categories={categoryOptions}
            type="product"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductsPage; 