import './Badge.css';

const Badge = ({
  children,
  variant = 'default', // 'default', 'success', 'error', 'warning', 'info'
  className = '',
  showDot = true,
}) => {
  const classes = [
    'ui-badge',
    `ui-badge--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {showDot && variant === 'success' && <span className="ui-badge-dot"></span>}
      {showDot && variant === 'default' && <span className="ui-badge-dot ui-badge-dot--default"></span>}
      {children}
    </span>
  );
};

export default Badge;
