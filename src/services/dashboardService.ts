import axios from 'axios';

interface DashboardFilters {
  date: string;
  appointmentStatus: string;
  invoiceStatus: string;
}

interface DashboardStats {
  appointmentsToday: number;
  totalSales: number;
  servicesProvided: number;
  productsSold: number;
  activeEmployees: number;
}

interface ServiceSales {
  name: string;
  value: number;
}

interface ProductSales {
  name: string;
  value: number;
}

const BASE_URL = process.env.REACT_APP_API_URL;

export const dashboardService = {
  async getDashboardStats(filters: DashboardFilters): Promise<DashboardStats> {
    const response = await axios.get(`${BASE_URL}/api/dashboard/stats`, { params: filters });
    return response.data;
  },

  async getServiceSales(filters: DashboardFilters): Promise<ServiceSales[]> {
    const response = await axios.get(`${BASE_URL}/api/dashboard/service-sales`, { params: filters });
    return response.data;
  },

  async getProductSales(filters: DashboardFilters): Promise<ProductSales[]> {
    const response = await axios.get(`${BASE_URL}/api/dashboard/product-sales`, { params: filters });
    return response.data;
  },

  async getEmployeeStats(filters: DashboardFilters) {
    const response = await axios.get(`${BASE_URL}/api/dashboard/employee-stats`, { params: filters });
    return response.data;
  }
};

export default dashboardService; 