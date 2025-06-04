import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onEdit, onDelete }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`;
  };

  return (
    <div className="bg-white rounded shadow-sm p-3">
      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th className="text-center">Duración</th>
            <th className="text-end">Precio Base</th>
            <th className="text-center">Impuesto</th>
            <th className="text-end">Precio Final</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => {
            const finalPrice = service.is_taxable 
              ? service.price * (1 + service.tax_rate / 100)
              : service.price;
            
            return (
              <tr key={service.id}>
                <td>
                  <code>{service.code || '-'}</code>
                </td>
                <td>
                  {service.name}
                  {service.description && (
                    <div className="text-muted small">{service.description}</div>
                  )}
                </td>
                <td>
                  {service.category ? (
                    <Badge bg="info">{service.category.name}</Badge>
                  ) : (
                    <Badge bg="secondary">Sin categoría</Badge>
                  )}
                </td>
                <td className="text-center">
                  {formatDuration(service.duration_minutes)}
                </td>
                <td className="text-end">{formatCurrency(service.price)}</td>
                <td className="text-center">
                  {service.is_taxable ? (
                    <Badge bg="warning">{service.tax_rate}%</Badge>
                  ) : (
                    <Badge bg="secondary">N/A</Badge>
                  )}
                </td>
                <td className="text-end">{formatCurrency(finalPrice)}</td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(service)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(service)}
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

export default ServiceList; 