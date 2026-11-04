import PrimaryButton from '../components/PrimaryButton';

function CartPage() {
  return (
    <div className="page">
      <h1 className="page-title">Кошик</h1>
      <p className="empty-message">Кошик порожній.</p>
      <div className="page-actions">
        <PrimaryButton to="/catalog">Перейти до каталогу</PrimaryButton>
      </div>
    </div>
  );
}

export default CartPage;
