import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ResetSuccess = () => {
  const navigate = useNavigate();

  const CheckCircleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-6)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {CheckCircleIcon}
        </div>
      </div>
      
      <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--spacing-4)' }}>
        Réinitialisation réussie
      </h2>
      
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-8)', lineHeight: 1.5, maxWidth: '320px', margin: '0 auto var(--spacing-8) auto' }}>
        Votre mot de passe a bien été mis à jour. Vous pouvez maintenant vous connecter avec vos nouveaux identifiants.
      </p>

      <Button 
        fullWidth 
        variant="primary" 
        onClick={() => navigate('/login')}
        style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
      >
        Back to Login
      </Button>
    </div>
  );
};

export default ResetSuccess;
