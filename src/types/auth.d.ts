declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_DEFAULT_REDIRECT: string;
  }
}

type UserRole = 'admin' | 'cashier' | 'employee';

interface AuthTokens {
  token: string;
  role: UserRole;
}