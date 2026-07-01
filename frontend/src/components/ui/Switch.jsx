import React from 'react';
import './Switch.css';

const Switch = ({ checked, onChange, disabled = false, id }) => {
  return (
    <label className={`ui-switch ${disabled ? 'ui-switch--disabled' : ''}`} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="ui-switch-input"
      />
      <span className="ui-switch-slider"></span>
    </label>
  );
};

export default Switch;
