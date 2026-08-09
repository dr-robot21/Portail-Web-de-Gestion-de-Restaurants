import './Alert.css';

const Alert = ({
  children,
  title,
  type = 'error', // 'error', 'success', 'warning', 'info'
  icon,
  className = '',
}) => {
  const classes = [
    'ui-alert',
    `ui-alert--${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="alert">
      {icon && (
        <div className="ui-alert-icon">
          {icon}
        </div>
      )}
      <div className="ui-alert-content">
        {title && <div className="ui-alert-title">{title}</div>}
        <div className="ui-alert-message">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
