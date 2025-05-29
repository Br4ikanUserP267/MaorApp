import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
};

export const toastSuccess = (message: string) => ({
  ...toastConfig,
  type: 'success' as const,
  style: {
    background: '#198754'
  }
});

export const toastError = (message: string) => ({
  ...toastConfig,
  type: 'error' as const,
  style: {
    background: '#dc3545'
  }
});

export const toastWarning = (message: string) => ({
  ...toastConfig,
  type: 'warning' as const,
  style: {
    background: '#ffc107',
    color: '#000'
  }
});

export const toastInfo = (message: string) => ({
  ...toastConfig,
  type: 'info' as const,
  style: {
    background: '#0dcaf0'
  }
}); 