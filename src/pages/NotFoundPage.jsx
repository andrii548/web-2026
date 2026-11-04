import PrimaryButton from '../components/PrimaryButton';

function NotFoundPage() {
  return (
    <div className="page">
      <h1 className="page-title">Сторінку не знайдено</h1>
      <p className="empty-message">Такої адреси не існує.</p>
      <div className="page-actions">
        <PrimaryButton to="/">На головну</PrimaryButton>
      </div>
    </div>
  );
}

export default NotFoundPage;
