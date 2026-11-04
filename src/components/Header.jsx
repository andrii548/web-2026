import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import './Header.css';

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Catalog', to: '/catalog' },
  { label: 'Cart', to: '/cart' },
];

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />

        <nav className="header-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
