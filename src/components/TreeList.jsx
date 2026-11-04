import TreeCard from './TreeCard';
import './TreeList.css';

function TreeList({ trees }) {
  return (
    <div className="tree-list">
      {trees.map((tree) => (
        <TreeCard key={tree.id} tree={tree} />
      ))}
    </div>
  );
}

export default TreeList;
