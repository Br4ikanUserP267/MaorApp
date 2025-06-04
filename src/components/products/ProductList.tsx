import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded shadow-sm p-3">
      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th className="text-center">Stock</th>
            <th className="text-end">Costo</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Margen</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const margin = ((product.price - product.cost) / product.cost) * 100;
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {product.category ? (
                    <Badge bg="info">{product.category.name}</Badge>
                  ) : (
                    <Badge bg="secondary">Sin categoría</Badge>
                  )}
                </td>
                <td className="text-center">
                  <Badge 
                    bg={product.stock > 0 ? 'success' : 'danger'}
                  >
                    {product.stock}
                  </Badge>
                </td>
                <td className="text-end">{formatCurrency(product.cost)}</td>
                <td className="text-end">{formatCurrency(product.price)}</td>
                <td className="text-end">
                  <Badge 
                    bg={margin >= 30 ? 'success' : margin >= 20 ? 'warning' : 'danger'}
                  >
                    {margin.toFixed(1)}%
                  </Badge>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(product)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList; 