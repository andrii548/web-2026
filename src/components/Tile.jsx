import TreeImage from './TreeImage';
import './Tile.css';

function Tile({ tile }) {
  return (
    <article className="tile">
      <TreeImage
        className="tile-image"
        src={tile.imageUrl}
        alt={tile.title}
        colors={tile.colors}
        snow={tile.snow}
        tint={tile.tint}
        size={tile.size}
      />
      <h3 className="tile-title">{tile.title}</h3>
      <p className="tile-text">{tile.description}</p>
    </article>
  );
}

export default Tile;
