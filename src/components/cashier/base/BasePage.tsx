import React from 'react';
import { Card } from 'react-bootstrap';
import CashierLayout from '../layout/CashierLayout';

interface BasePageProps {
  title: string;
  children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ title, children }) => {
  return (
    <CashierLayout>
      <div className="p-4">
        <h2 className="mb-4">{title}</h2>
        <Card>
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      </div>
    </CashierLayout>
  );
};

export default BasePage; 