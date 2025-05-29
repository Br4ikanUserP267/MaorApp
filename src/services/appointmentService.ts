export interface Appointment {
  id: number;
  date: string;
  time: string;
  duration: number;
  customer: {
    name: string;
    phone: string;
  };
  professional: {
    name: string;
  };
  service: {
    name: string;
    price: number;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  notes?: string;
}

export interface CreateAppointmentDto {
  customerId: number;
  serviceId: number;
  professionalId: number;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {
  status?: 'pending' | 'confirmed' | 'completed' | 'canceled';
}

// Mock data for development
const mockAppointments: Appointment[] = [
  {
    id: 1,
    date: '2024-03-15',
    time: '09:00',
    duration: 90,
    customer: {
      name: 'María González',
      phone: '300-123-4567'
    },
    professional: {
      name: 'Dra. Laura Martínez'
    },
    service: {
      name: 'Tratamiento Facial Premium',
      price: 180000
    },
    status: 'pending',
    notes: 'Cliente preferente, traer productos especiales'
  },
  {
    id: 2,
    date: '2024-03-15',
    time: '10:30',
    duration: 45,
    customer: {
      name: 'Carlos Ramírez',
      phone: '320-456-7891'
    },
    professional: {
      name: 'Dra. Laura Martínez'
    },
    service: {
      name: 'Depilación Láser',
      price: 250000
    },
    status: 'confirmed',
    notes: 'Primera sesión de depilación'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const appointmentService = {
  async getAppointments(filters?: {
    date?: string;
    status?: string;
    professionalId?: string;
  }): Promise<Appointment[]> {
    await delay(500); // Simulate API delay

    let filteredAppointments = [...mockAppointments];

    if (filters) {
      if (filters.date) {
        filteredAppointments = filteredAppointments.filter(apt => apt.date === filters.date);
      }
      if (filters.status && filters.status !== 'all') {
        filteredAppointments = filteredAppointments.filter(apt => apt.status === filters.status);
      }
      if (filters.professionalId && filters.professionalId !== 'all') {
        filteredAppointments = filteredAppointments.filter(
          apt => apt.professional.name === (
            filters.professionalId === '1' ? 'Dra. Laura Martínez' :
            filters.professionalId === '2' ? 'Est. Sofía Rodríguez' :
            'Lic. Carolina Gómez'
          )
        );
      }
    }

    return filteredAppointments;
  },

  async createAppointment(appointmentData: CreateAppointmentDto): Promise<Appointment> {
    await delay(500);
    
    // In a real implementation, this would be handled by the backend
    const newAppointment: Appointment = {
      id: mockAppointments.length + 1,
      date: appointmentData.date,
      time: appointmentData.time,
      duration: 60, // Default duration
      customer: {
        name: 'Nuevo Cliente',
        phone: '000-000-0000'
      },
      professional: {
        name: appointmentData.professionalId === 1 ? 'Dra. Laura Martínez' :
              appointmentData.professionalId === 2 ? 'Est. Sofía Rodríguez' :
              'Lic. Carolina Gómez'
      },
      service: {
        name: 'Servicio de Prueba',
        price: 100000
      },
      status: 'pending',
      notes: appointmentData.notes
    };

    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  async updateAppointment(id: number, appointmentData: UpdateAppointmentDto): Promise<Appointment> {
    await delay(500);

    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);
    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    const updatedAppointment = {
      ...mockAppointments[appointmentIndex],
      ...appointmentData
    };

    mockAppointments[appointmentIndex] = updatedAppointment;
    return updatedAppointment;
  },

  async deleteAppointment(id: number): Promise<void> {
    await delay(500);
    
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);
    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    mockAppointments.splice(appointmentIndex, 1);
  }
};

export default appointmentService; 