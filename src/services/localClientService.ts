interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface Professional {
  id: number;
  name: string;
  role: string;
}

// Mock data
const products: Product[] = [
  { id: 1, name: 'Crema Hidratante Premium', price: 85000, category: 'Facial' },
  { id: 2, name: 'Serum Revitalizante', price: 120000, category: 'Facial' },
  { id: 3, name: 'Mascarilla Purificante', price: 65000, category: 'Facial' },
  { id: 4, name: 'Aceite Esencial de Rosa', price: 95000, category: 'Corporal' },
  { id: 5, name: 'Esmalte Semipermanente', price: 45000, category: 'Uñas' },
  { id: 6, name: 'Kit Maquillaje Profesional', price: 180000, category: 'Maquillaje' },
  { id: 7, name: 'Protector Solar FPS 50', price: 75000, category: 'Facial' },
  { id: 8, name: 'Shampoo Reconstructor', price: 55000, category: 'Cabello' }
];

const services: Service[] = [
  { id: 1, name: 'Tratamiento Facial Premium', price: 180000, duration: 90 },
  { id: 2, name: 'Depilación Láser', price: 250000, duration: 45 },
  { id: 3, name: 'Masaje Relajante', price: 120000, duration: 60 },
  { id: 4, name: 'Manicura Semipermanente', price: 80000, duration: 45 },
  { id: 5, name: 'Pedicura Spa', price: 90000, duration: 60 },
  { id: 6, name: 'Limpieza Facial Profunda', price: 150000, duration: 75 },
  { id: 7, name: 'Maquillaje Profesional', price: 130000, duration: 60 },
  { id: 8, name: 'Tratamiento Capilar', price: 160000, duration: 90 }
];

const professionals: Professional[] = [
  { id: 1, name: 'Dra. Laura Martínez', role: 'Dermatóloga' },
  { id: 2, name: 'Est. Sofía Rodríguez', role: 'Esteticista' },
  { id: 3, name: 'Lic. Carolina Gómez', role: 'Cosmetóloga' },
  { id: 4, name: 'Dra. Ana Torres', role: 'Dermatóloga' },
  { id: 5, name: 'Est. María Pérez', role: 'Esteticista' }
];

const localClientService = {
  getProducts(): Promise<Product[]> {
    return Promise.resolve(products);
  },

  getServices(): Promise<Service[]> {
    return Promise.resolve(services);
  },

  getProfessionals(): Promise<Professional[]> {
    return Promise.resolve(professionals);
  },

  addProductToClient(clientId: number, productId: number, quantity: number): Promise<void> {
    // En una implementación real, esto se conectaría con el backend
    return Promise.resolve();
  },

  addServiceToClient(
    clientId: number, 
    serviceId: number, 
    professionalId: number,
    notes?: string
  ): Promise<void> {
    // En una implementación real, esto se conectaría con el backend
    return Promise.resolve();
  },

  getProductsByCategory(): Record<string, Product[]> {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }
};

export type { Product, Service, Professional };
export default localClientService; 