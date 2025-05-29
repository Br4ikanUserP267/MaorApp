import React, { PropsWithChildren } from 'react';
import StaffLayout from '../../staff/layout/StaffLayout';

interface EmployeeLayoutProps extends PropsWithChildren {}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  return (
    <StaffLayout role="employee">
      {children}
    </StaffLayout>
  );
};

export default EmployeeLayout; 