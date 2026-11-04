import Tile from './Tile';
import './TileList.css';

function TileList({ tiles }) {
  return (
    <section className="tile-list">
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </section>
  );
}

export default TileList;
