import axios from 'axios';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  identification_number: string;
  customer_type: 'individual' | 'business';
  is_active: boolean;
  loyalty_points: number;
  created_at: string;
  updated_at: string | null;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  address?: string;
  identification_number: string;
  customer_type: 'individual' | 'business';
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {
  is_active?: boolean;
  loyalty_points?: number;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "123-456-7890",
    address: "Calle Principal 123",
    identification_number: "A123456789",
    customer_type: "individual",
    is_active: true,
    loyalty_points: 100,
    created_at: new Date().toISOString(),
    updated_at: null
  },
  {
    id: 2,
    name: "Empresa ABC",
    email: "contacto@abc.com",
    phone: "098-765-4321",
    address: "Avenida Comercial 456",
    identification_number: "B987654321",
    customer_type: "business",
    is_active: true,
    loyalty_points: 250,
    created_at: new Date().toISOString(),
    updated_at: null
  }
];

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCustomers;
  },

  async getCustomerById(id: number): Promise<Customer> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  },

  async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCustomer: Customer = {
      id: mockCustomers.length + 1,
      ...customerData,
      is_active: true,
      loyalty_points: 0,
      created_at: new Date().toISOString(),
      updated_at: null
    };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  async updateCustomer(id: number, customerData: UpdateCustomerDto): Promise<Customer> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const customerIndex = mockCustomers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    
    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      ...customerData,
      updated_at: new Date().toISOString()
    };
    
    return mockCustomers[customerIndex];
  },

  async deleteCustomer(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const customerIndex = mockCustomers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    mockCustomers.splice(customerIndex, 1);
  },

  async getCustomerAppointments(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        date: new Date().toISOString(),
        service: "Consulta general",
        status: "scheduled"
      }
    ];
  },

  async getCustomerInvoices(id: number) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        date: new Date().toISOString(),
        amount: 150.00,
        status: "paid"
      }
    ];
  },

  async updateLoyaltyPoints(id: number, points: number): Promise<Customer> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const customerIndex = mockCustomers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    
    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      loyalty_points: points,
      updated_at: new Date().toISOString()
    };
    
    return mockCustomers[customerIndex];
  }
};

export default customerService; 