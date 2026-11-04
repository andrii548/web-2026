import TreeIllustration from './TreeIllustration';
import './TreeImage.css';

function TreeImage({ src, alt = '', colors, snow, tint, size = 85, className = '' }) {
  return (
    <div className={`tree-image${src ? ' tree-image--photo' : ''} ${className}`} style={{ background: tint }}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <TreeIllustration colors={colors} snow={snow} style={{ height: `${size}%` }} />
      )}
    </div>
  );
}

export default TreeImage;
