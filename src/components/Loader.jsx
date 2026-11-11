import './Loader.css';

function Loader({ message = 'Завантаження даних...' }) {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-spinner"></div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
}

export default Loader;

