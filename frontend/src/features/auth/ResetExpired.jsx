import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ResetExpired = () => {
  const navigate = useNavigate();

  const AlertCircleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  const ArrowLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-6)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {AlertCircleIcon}
        </div>
      </div>
      
      <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 auto var(--spacing-4) auto', maxWidth: '280px', lineHeight: 1.2 }}>
        Lien de réinitialisation expiré
      </h2>
      
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-8)', lineHeight: 1.5, maxWidth: '320px', margin: '0 auto var(--spacing-8) auto' }}>
        Le lien de réinitialisation du mot de passe n'est plus valide ou a déjà été utilisé. Veuillez demander un nouveau lien pour continuer.
      </p>

      <Button 
        fullWidth 
        variant="primary" 
        onClick={() => navigate('/forgot-password')}
        style={{ backgroundColor: '#c53030', borderColor: '#c53030', marginBottom: 'var(--spacing-6)' }}
      >
        Nouveau lien
      </Button>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}>
          {ArrowLeftIcon} Revenir à la connexion
        </Link>
      </div>
    </div>
  );
};

export default ResetExpired;
