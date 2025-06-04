import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  requires_approval: boolean;
  is_active: boolean;
  processing_fee_percent: number;
}

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  onEdit: (paymentMethod: PaymentMethod) => void;
  onDelete: (paymentMethod: PaymentMethod) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  paymentMethods,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded shadow-sm p-3">
      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th className="text-center">Comisión</th>
            <th className="text-center">Requiere Aprobación</th>
            <th className="text-center">Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map(method => (
            <tr key={method.id}>
              <td>{method.name}</td>
              <td>
                <small className="text-muted">
                  {method.description || 'Sin descripción'}
                </small>
              </td>
              <td className="text-center">
                {method.processing_fee_percent > 0 ? (
                  <Badge bg="info">{method.processing_fee_percent}%</Badge>
                ) : (
                  <Badge bg="secondary">Sin comisión</Badge>
                )}
              </td>
              <td className="text-center">
                {method.requires_approval ? (
                  <Badge bg="warning">Requiere aprobación</Badge>
                ) : (
                  <Badge bg="success">Automático</Badge>
                )}
              </td>
              <td className="text-center">
                <Badge bg={method.is_active ? 'success' : 'danger'}>
                  {method.is_active ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(method)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(method)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {paymentMethods.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-muted">
                No hay métodos de pago registrados
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentMethodList; 