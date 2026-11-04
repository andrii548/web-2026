import { useParams } from 'react-router-dom';
import TreeImage from '../components/TreeImage';
import PrimaryButton from '../components/PrimaryButton';
import { useTrees } from '../context/TreesContext';
import { formatPrice, treeImageSize } from '../utils/format';
import './ItemPage.css';

function ItemPage() {
  const { id } = useParams();
  const { trees } = useTrees();
  const tree = trees.find((item) => item.id === Number(id));

  if (!tree) {
    return (
      <div className="page">
        <h1 className="page-title">Ялинку не знайдено</h1>
        <div className="page-actions">
          <PrimaryButton to="/catalog">До каталогу</PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="item">
        <TreeImage
          className="item-image"
          src={tree.imageUrl}
          alt={tree.manufacturer}
          colors={tree.colors}
          snow={tree.snow}
          tint={tree.tint}
          size={treeImageSize(tree.height)}
        />

        <div className="item-info">
          <h1 className="item-title">{tree.manufacturer}</h1>
          <p className="item-price">{formatPrice(tree.price)}</p>
          <p className="item-description">{tree.description}</p>

          <dl className="item-specs">
            <div className="item-spec">
              <dt>Виробник</dt>
              <dd>{tree.manufacturer}</dd>
            </div>
            <div className="item-spec">
              <dt>Висота</dt>
              <dd>{tree.height} см</dd>
            </div>
            <div className="item-spec">
              <dt>Матеріал</dt>
              <dd>{tree.material}</dd>
            </div>
          </dl>

          <PrimaryButton to="/catalog" variant="secondary">
            Назад до каталогу
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
