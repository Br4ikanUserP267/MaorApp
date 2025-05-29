import { useState, FormEvent } from 'react';
import { login } from '../../services/login';
import Cookies from 'js-cookie';
import '../../assets/styles/login/login.css';
import Logo from "../../assets/images/logo/logomaor.png";

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('[Login] Iniciando proceso de autenticación...');

    try {
      console.debug('[Login] Credenciales recibidas:', { email });
      const data = await login({ email, password });
      console.info('[Login] Autenticación exitosa', data);

     
      console.log('[Login] Configurando cookies de sesión...');
      Cookies.set('token', data.token, { 
        expires: 7, 
        secure: import.meta.env.PROD,
        sameSite: 'strict' 
      });
      
      const redirectUrl = import.meta.env.VITE_ADMIN_REDIRECT || '/admin';
      console.log(`[Login] Redireccionando a: ${redirectUrl}`);
      window.location.href = redirectUrl;

    } catch (err: unknown) {
      console.error('[Login] Error en el proceso:', err);
      
      console.log('[Login] Limpiando cookies...');
      Cookies.remove('token');
      Cookies.remove('role');

      const errorMessage = err instanceof Error ? err.message : 'Error de autenticación';
      console.log(`[Login] Mostrando error al usuario: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      console.log('[Login] Proceso finalizado');
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundColor: 'var(--maor-light)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card shadow-lg p-4 mb-5 bg-white rounded">
              <img src={Logo} alt="Logo MAOR" className='Logo'/>
              <div className="text-center mb-4">
                <div className="logo-container p-3 rounded-circle" style={{ backgroundColor: 'var(--maor-primary)' }}>
                  <h2 className="text-white mb-0"><i className="fas fa-spa"></i></h2>
                </div>
                <h3 className="mt-3" style={{ color: 'var(--maor-primary)' }}>Acceso Corporativo</h3>
                <p className="text-muted">Sistema de gestión MAOR</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Corporativo</label>
                  <input 
                    type="email" 
                    className="form-control input-maor" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control input-maor" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-maor w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Verificando...' : 'Acceso Admin'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;