import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, className = '', hideCloseButton = false }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ui-modal-overlay" onClick={onClose}>
      <div 
        className={`ui-modal-content ${className}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {!hideCloseButton && (
          <button className="ui-modal-close" onClick={onClose} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
