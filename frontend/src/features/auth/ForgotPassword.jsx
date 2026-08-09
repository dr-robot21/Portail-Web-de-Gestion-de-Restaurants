import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ForgotPassword = () => {
  const MailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#7f1d1d"></path>
      <polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2"></polyline>
    </svg>
  );

  const RefreshIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
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
          {MailIcon}
        </div>
      </div>
      
      <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', marginBottom: 'var(--spacing-4)' }}>
        Consultez votre boîte mail
      </h2>
      
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-8)', lineHeight: 1.5, maxWidth: '320px', margin: '0 auto var(--spacing-8) auto' }}>
        Nous avons envoyé un lien de récupération de mot de passe à votre adresse courriel. Veuillez consulter votre boîte de réception et suivre les instructions.
      </p>

      <Button 
        fullWidth 
        variant="primary" 
        style={{ backgroundColor: '#c53030', borderColor: '#c53030', marginBottom: 'var(--spacing-6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {RefreshIcon} RESEND EMAIL
      </Button>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}>
          {ArrowLeftIcon} Revenir à la connexion
        </Link>
      </div>

      {/* Since AuthLayout encapsulates this in a Card and sets a max-width, placing the contact support link here requires absolute positioning or moving it outside. But since we use AuthLayout, I can position it absolute at the bottom or just append it and break out of the padding.
          To keep it clean, I'll place it outside the regular document flow, or just style it with a negative margin hack.
      */}
      <div style={{ position: 'absolute', bottom: '-40px', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-family)', fontSize: '12px', color: '#94a3b8' }}>
        Having trouble? <Link to="/support" style={{ color: '#b91c1c', fontWeight: 'var(--weight-bold)', textDecoration: 'none' }}>Contact Support</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
