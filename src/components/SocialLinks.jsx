import './SocialLinks.css';

const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', symbol: 'f', url: 'https://facebook.com' },
  { id: 'twitter', label: 'Twitter', symbol: 't', url: 'https://twitter.com' },
  { id: 'linkedin', label: 'LinkedIn', symbol: 'in', url: 'https://linkedin.com' },
  { id: 'google', label: 'Google', symbol: 'G+', url: 'https://google.com' },
];

function SocialLinks() {
  return (
    <div className="social-links">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          className="social-link"
          href={link.url}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
        >
          {link.symbol}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
