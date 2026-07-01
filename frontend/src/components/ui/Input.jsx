import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  icon,
  actionIcon,
  onActionClick,
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  const containerClasses = [
    'ui-input-container',
    fullWidth ? 'ui-input-container--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  const inputWrapperClasses = [
    'ui-input-wrapper',
    error ? 'ui-input-wrapper--error' : '',
    icon ? 'ui-input-wrapper--has-icon' : '',
    actionIcon ? 'ui-input-wrapper--has-action' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <div className="ui-input-header">
          <label className="ui-input-label">{label}</label>
          {error && <span className="ui-input-error-icon" title={error}>!</span>}
        </div>
      )}
      
      <div className={inputWrapperClasses}>
        {icon && (
          <span className="ui-input-icon">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          type={type}
          className="ui-input"
          {...props}
        />

        {actionIcon && (
          <button
            type="button"
            className="ui-input-action"
            onClick={onActionClick}
            tabIndex="-1"
          >
            {actionIcon}
          </button>
        )}
      </div>

      {error && <span className="ui-input-error-text">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
