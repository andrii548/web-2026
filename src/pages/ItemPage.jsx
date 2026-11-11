import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TreeImage from '../components/TreeImage';
import PrimaryButton from '../components/PrimaryButton';
import Loader from '../components/Loader';
import { getTreeById } from '../api/treesApi';
import { formatPrice, treeImageSize } from '../utils/format';
import './ItemPage.css';

const DEFAULT_STANDS = [
  { id: 'standard', name: 'Металева хрестовина (у комплекті)', price: 0 },
  { id: 'wood', name: "Дерев'яний пеньок-хрестовина", price: 350 },
  { id: 'rotating', name: 'Обертова електрична підставка 360°', price: 750 },
  { id: 'vintage', name: "Кована підставка 'Вінтаж'", price: 490 },
];

const ADDON_OPTIONS = [
  { id: 'none', name: 'Без додаткової комплектації', price: 0 },
  { id: 'garland', name: "Вмонтована тепла LED-гірлянда 'Роса'", price: 450 },
  { id: 'balls', name: 'Набір скляних кульок (12 шт)', price: 290 },
  { id: 'aroma', name: 'Преміум хвойний ароматизатор', price: 150 },
];

function ItemPage() {
  const { id } = useParams();

  const [tree, setTree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedStandId, setSelectedStandId] = useState('standard');
  const [selectedAddonId, setSelectedAddonId] = useState('none');
  const [quantity, setQuantity] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    setOrderConfirmed(null);

    getTreeById(id)
      .then((data) => {
        if (isMounted) {
          setTree(data);
          setSelectedHeight(data.height);
          if (data.stands && data.stands.length > 0) {
            setSelectedStandId(data.stands[0].id);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err.response?.status === 404
              ? 'Ялинку з таким ID не знайдено на сервері.'
              : 'Не вдалося з’єднатися із сервером для завантаження товару.'
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="page">
        <Loader message="Завантаження характеристик ялинки з сервера..." />
      </div>
    );
  }

  if (error || !tree) {
    return (
      <div className="page">
        <h1 className="page-title">{error || 'Ялинку не знайдено'}</h1>
        <div className="page-actions">
          <PrimaryButton to="/catalog">До каталогу</PrimaryButton>
        </div>
      </div>
    );
  }

  const standsList = tree.stands && tree.stands.length > 0 ? tree.stands : DEFAULT_STANDS;
  const availableHeights =
    tree.availableHeights && tree.availableHeights.length > 0
      ? tree.availableHeights
      : [tree.height];

  const currentHeight = selectedHeight || tree.height;
  const currentStand = standsList.find((s) => s.id === selectedStandId) || standsList[0];
  const currentAddon = ADDON_OPTIONS.find((a) => a.id === selectedAddonId) || ADDON_OPTIONS[0];

  const heightRatio = currentHeight / tree.height;
  const baseItemPrice = Math.round(tree.price * heightRatio);
  const unitPrice = baseItemPrice + (currentStand?.price || 0) + (currentAddon?.price || 0);
  const totalPrice = unitPrice * quantity;

  function handleAddToCart() {
    setOrderConfirmed({
      manufacturer: tree.manufacturer,
      height: currentHeight,
      stand: currentStand.name,
      addon: currentAddon.name,
      quantity,
      totalPrice,
    });
  }

  return (
    <div className="page">
      <div className="item">
        <div className="item-visual-column">
          <TreeImage
            className="item-image"
            src={tree.imageUrl}
            alt={tree.manufacturer}
            colors={tree.colors}
            snow={tree.snow}
            tint={tree.tint}
            size={treeImageSize(currentHeight)}
          />

          {tree.features && tree.features.length > 0 && (
            <div className="item-features-badge-list">
              {tree.features.map((feature, idx) => (
                <span key={idx} className="item-feature-tag">
                  ✓ {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="item-info">
          <h1 className="item-title">{tree.manufacturer}</h1>
          <p className="item-price">{formatPrice(unitPrice)} <span className="item-price-note">/ шт.</span></p>
          <p className="item-description">{tree.description}</p>

          <dl className="item-specs">
            <div className="item-spec">
              <dt>Виробник</dt>
              <dd>{tree.manufacturer}</dd>
            </div>
            <div className="item-spec">
              <dt>Матеріал хвої</dt>
              <dd>{tree.material}</dd>
            </div>
            <div className="item-spec">
              <dt>Обрана висота</dt>
              <dd><strong>{currentHeight} см</strong></dd>
            </div>
          </dl>

          <div className="item-options-section">
            <h3 className="options-heading">Налаштування параметрів ялинки:</h3>

            <div className="option-group">
              <label className="option-label">
                <span>Виберіть висоту:</span>
                <span className="option-hint">{currentHeight} см</span>
              </label>
              <div className="option-pills">
                {availableHeights.map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`option-pill ${currentHeight === h ? 'selected' : ''}`}
                    onClick={() => setSelectedHeight(h)}
                  >
                    {h} см
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">
                <span>Тип підставки:</span>
                <span className="option-hint">{currentStand.name}</span>
              </label>
              <div className="option-cards-list">
                {standsList.map((stand) => (
                  <div
                    key={stand.id}
                    className={`option-card ${selectedStandId === stand.id ? 'selected' : ''}`}
                    onClick={() => setSelectedStandId(stand.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedStandId(stand.id);
                    }}
                  >
                    <input
                      type="radio"
                      name="stand"
                      checked={selectedStandId === stand.id}
                      onChange={() => setSelectedStandId(stand.id)}
                    />
                    <div className="option-card-content">
                      <span className="option-card-title">{stand.name}</span>
                      <span className="option-card-price">
                        {stand.price === 0 ? 'Безкоштовно' : `+${stand.price} ₴`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">
                <span>Додаткова комплектація:</span>
              </label>
              <select
                className="select item-addon-select"
                value={selectedAddonId}
                onChange={(e) => setSelectedAddonId(e.target.value)}
              >
                {ADDON_OPTIONS.map((addon) => (
                  <option key={addon.id} value={addon.id}>
                    {addon.name} {addon.price > 0 ? `(+${addon.price} ₴)` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="option-group quantity-group">
              <label className="option-label">Кількість:</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Зменшити кількість"
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Збільшити кількість"
                >
                  +
                </button>
              </div>
            </div>

            <div className="item-total-summary">
              <span className="total-label">Загальна вартість:</span>
              <span className="total-amount">{formatPrice(totalPrice)}</span>
            </div>

            {orderConfirmed && (
              <div className="order-confirmation-toast" role="alert">
                <p className="order-conf-title">✓ Товар з обраними параметрами обрано!</p>
                <p className="order-conf-details">
                  Ялинка: <strong>{orderConfirmed.manufacturer}</strong> ({orderConfirmed.height} см),{' '}
                  підставка: <em>{orderConfirmed.stand}</em>, опція: <em>{orderConfirmed.addon}</em>,{' '}
                  кількість: {orderConfirmed.quantity} шт. на суму <strong>{formatPrice(orderConfirmed.totalPrice)}</strong>.
                </p>
              </div>
            )}

            <div className="item-action-buttons">
              <PrimaryButton onClick={handleAddToCart}>
                Додати до кошика
              </PrimaryButton>
              <PrimaryButton to="/catalog" variant="secondary">
                Назад до каталогу
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
