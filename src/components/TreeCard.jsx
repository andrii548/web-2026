import TreeImage from './TreeImage';
import PrimaryButton from './PrimaryButton';
import { formatPrice, treeImageSize } from '../utils/format';
import './TreeCard.css';

function TreeCard({ tree }) {
  return (
    <article className="tree-card">
      <TreeImage
        className="tree-card-image"
        src={tree.imageUrl}
        alt={tree.manufacturer}
        colors={tree.colors}
        snow={tree.snow}
        tint={tree.tint}
        size={treeImageSize(tree.height)}
      />

      <h3 className="tree-card-title">{tree.manufacturer}</h3>
      <p className="tree-card-text">{tree.description}</p>
      <p className="tree-card-meta">
        {tree.height} см · {tree.material}
      </p>
      <p className="tree-card-price">{formatPrice(tree.price)}</p>

      <PrimaryButton to={`/catalog/${tree.id}`} fullWidth>
        View more
      </PrimaryButton>
    </article>
  );
}

export default TreeCard;
