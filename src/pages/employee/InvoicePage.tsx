import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import { FaFileExcel, FaWhatsapp } from 'react-icons/fa';

interface Invoice {
  id: string;
  date: string;
  client: string;
  phone: string;
  services: {
    name: string;
    price: number;
  }[];
  total: number;
}

const InvoicePage: React.FC = () => {
  // Datos de ejemplo
  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: '2024-03-15',
      client: 'María García',
      phone: '1234567890',
      services: [
        { name: 'Corte de cabello', price: 300 },
        { name: 'Tinte', price: 800 }
      ],
      total: 1100
    },
    // Más facturas...
  ];

  const handleExportCSV = (invoice: Invoice) => {
    // Crear encabezados
    const headers = [
      ['Factura:', invoice.id],
      ['Fecha:', invoice.date],
      ['Cliente:', invoice.client],
      [''],  // Línea en blanco
      ['Servicio', 'Precio']  // Encabezados de la tabla
    ];

    // Crear filas de servicios
    const serviceRows = invoice.services.map(service => [
      service.name,
      `$${service.price.toFixed(2)}`
    ]);

    // Añadir total
    const totalRow = ['', ''];  // Línea en blanco
    const finalRow = ['Total:', `$${invoice.total.toFixed(2)}`];

    // Combinar todas las filas
    const csvContent = [
      ...headers,
      ...serviceRows,
      totalRow,
      finalRow
    ]
      .map(row => row.join(','))
      .join('\n');

    // Crear el blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `factura-${invoice.id}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppClick = (phone: string) => {
    const message = encodeURIComponent('¡Gracias por tu visita! Aquí está tu factura.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Facturas de Servicios</h2>
      
      {invoices.map((invoice) => (
        <Card key={invoice.id} className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Factura {invoice.id}</h5>
            <div>
              <Button
                variant="success"
                className="me-2"
                onClick={() => handleExportCSV(invoice)}
              >
                <FaFileExcel className="me-2" />
                Exportar CSV
              </Button>
              <Button
                variant="info"
                onClick={() => handleWhatsAppClick(invoice.phone)}
              >
                <FaWhatsapp className="me-2" />
                WhatsApp
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <strong>Cliente:</strong> {invoice.client}<br />
              <strong>Fecha:</strong> {invoice.date}
            </div>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {invoice.services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>${service.price.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="text-end"><strong>Total</strong></td>
                  <td><strong>${invoice.total.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default InvoicePage; 