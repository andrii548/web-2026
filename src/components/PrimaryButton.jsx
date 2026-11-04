import { Link } from 'react-router-dom';
import './PrimaryButton.css';

function PrimaryButton({ children, to, onClick, variant = 'primary', fullWidth = false }) {
  const className = `button button--${variant}${fullWidth ? ' button--full' : ''}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
