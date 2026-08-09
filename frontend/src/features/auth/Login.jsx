import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, error, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname;
      if (from && from !== '/login') {
        navigate(from);
      } else {
        navigate(user.role === 'super_admin' ? '/dashboard' : '/restaurant-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  const MailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const LockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const AlertCircleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(clearError());
      dispatch(login({ email, password }));
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 0 var(--spacing-2) 0' }}>
          Dashboard Admin Login
        </h1>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', margin: 0 }}>
          Sign in to access the management console
        </p>
      </div>

      <Card style={{ padding: 'var(--spacing-8)', boxShadow: 'var(--shadow-md)' }}>
        
        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          {error && (
            <Alert 
              type="error" 
              title="Login Failed"
              icon={AlertCircleIcon}
              style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c' }}
            >
              <span style={{ color: '#dc2626' }}>{error}</span>
            </Alert>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--spacing-5)' }}>
            <Input
              label="Email address *"
              type="email"
              placeholder="admin@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={MailIcon}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '-24px', position: 'relative', zIndex: 1 }}>
              <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}></span>
              <Link to="/forgot-password" style={{ fontSize: 'var(--font-xs)', color: 'var(--error-text)', textDecoration: 'none', fontWeight: 'var(--weight-bold)' }}>
                Mot de passe oublié ?
              </Link>
            </div>
            <Input
              label="Password *"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={LockIcon}
            />
          </div>

          <Button type="submit" fullWidth variant="primary" style={{ backgroundColor: '#b91c1c', borderColor: '#b91c1c', marginBottom: 'var(--spacing-6)' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>

          <div style={{ textAlign: 'center', fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: '#475569', fontWeight: 'var(--weight-bold)', textDecoration: 'none' }}>Register</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
