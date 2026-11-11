import Logo from './Logo';
import SocialLinks from './SocialLinks';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-about">
            <h2 className="footer-title">Ялинковий світ</h2>
            <p className="footer-text">
              Пропонуємо штучні ялинки для дому та офісу. Красиві, надійні та зручні у
              зберіганні, завжди під рукою.
            </p>
          </div>

          <Logo variant="light" />

          <SocialLinks />
        </div>

        <p className="footer-copyright">
          2026 Ялинковий світ © Всі права захищено
        </p>
      </div>
    </footer>
  );
}

export default Footer;
