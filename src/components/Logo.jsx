import { Link } from 'react-router-dom';
import './Logo.css';

function Logo({ variant = 'dark' }) {
  return (
    <Link to="/" className={`logo logo--${variant}`} aria-label="Ялинковий світ, на головну">
      <svg className="logo-svg" viewBox="0 0 170 112" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M85 4 L69 28 L77 28 L59 51 L68 51 L49 75 L121 75 L102 51 L111 51 L93 28 L101 28 Z" />
          <path d="M80 75 V82 H90 V75" />
        </g>
        <path className="logo-accent" d="M18 86 Q85 78 152 86" fill="none" strokeWidth="1.6" strokeLinecap="round" />
        <text className="logo-name" x="85" y="98" textAnchor="middle">ЯЛИНКОВИЙ СВІТ</text>
        <text className="logo-slogan" x="85" y="108" textAnchor="middle">ШТУЧНІ ЯЛИНКИ</text>
      </svg>
    </Link>
  );
}

export default Logo;
