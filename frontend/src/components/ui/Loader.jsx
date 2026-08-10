import './Loader.css';

const Loader = ({ size = 'sm', color = 'var(--text-inverse)' }) => (
  <span
    className="ui-loader"
    style={{
      width: size === 'sm' ? '16px' : '22px',
      height: size === 'sm' ? '16px' : '22px',
      borderTopColor: color,
      borderRightColor: color,
    }}
    aria-hidden="true"
  />
);

export default Loader;
