import Modal from './Modal';
import Button from './Button';

const ErrorModal = ({ isOpen, onClose, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
      <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', 
          backgroundColor: 'var(--error-bg)', color: 'var(--error-text)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto var(--spacing-4)' 
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
          {title || 'Erreur'}
        </h2>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={onClose}>Fermer</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
