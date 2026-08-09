import Modal from './Modal';
import Button from './Button';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton={true}>
      <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', 
          backgroundColor: '#f0fdf4', color: '#16a34a', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto var(--spacing-4)' 
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
          {title || 'Succès'}
        </h2>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }} onClick={onClose}>Continuer</Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
