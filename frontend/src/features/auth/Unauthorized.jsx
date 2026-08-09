import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px', padding: 'var(--spacing-8)' }}>
        <div style={{ color: 'var(--error-text)', marginBottom: 'var(--spacing-6)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', color: 'var(--text-primary)', marginBottom: 'var(--spacing-4)' }}>Accès Refusé</h1>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-md)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-8)', lineHeight: '1.6' }}>
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <Button variant="primary" onClick={() => navigate('/')} style={{ width: '100%' }}>
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
