import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Card, Table, Badge } from 'react-bootstrap';
import { FaBox, FaBoxes, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
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
  status: string;
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
      <div className="d-flex align-items-center mb-4">
        <div className="me-3">
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle" style={{ color: 'var(--maor-primary)' }}>
            <FaBox size={24} />
          </div>
        </div>
        <div>
          <h4 className="mb-0">Gestión de Productos</h4>
          <p className="text-muted mb-0">Administra el inventario de productos</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaBoxes className="me-2" style={{ color: 'var(--maor-primary)' }} />
              <span>Lista de Productos</span>
            </div>
            <Button 
              variant="primary" 
              style={{ backgroundColor: 'var(--maor-primary)', borderColor: 'var(--maor-primary)' }}
              onClick={() => setShowProductModal(true)}
            >
              <FaPlus className="me-2" />
              Nuevo Producto
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category?.name}</td>
                  <td className="text-end">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="text-center">
                    <Badge bg={product.stock > 10 ? 'success' : product.stock > 5 ? 'warning' : 'danger'}>
                      {product.stock} unidades
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Badge bg={product.status === 'active' ? 'success' : 'danger'}>
                      {product.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => handleEditProduct(product)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(product)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

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