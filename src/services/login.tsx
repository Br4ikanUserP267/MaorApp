import axios from 'axios';

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('[Auth Service] Enviando solicitud a:', `${apiUrl}/auth/login`);

    const response = await axios.post(`${apiUrl}/auth/login`, credentials);
    console.debug('[Auth Service] Respuesta recibida:', response.data);

    if (!response.data.token) {
      console.error('[Auth Service] Respuesta inválida:', response);
      throw new Error('Error en la respuesta del servidor');
    }

    return response.data;
  } catch (error: unknown) {
    console.error('[Auth Service] Error en la solicitud:', error);

    if (axios.isAxiosError(error)) {
      console.error('[Auth Service] Detalles del error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      const errorMessage = error.response?.data?.message || 'Error de conexión';
      throw new Error(errorMessage);
    }

    throw new Error('Error desconocido en el servicio de autenticación');
  }
};
