import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import Select from '../components/Select';
import PrimaryButton from '../components/PrimaryButton';
import TreeList from '../components/TreeList';
import { useTrees } from '../context/TreesContext';
import { filterTrees, MATERIAL_OPTIONS, HEIGHT_OPTIONS } from '../utils/filterTrees';
import './CatalogPage.css';

function CatalogPage() {
  const { trees } = useTrees();

  const [query, setQuery] = useState('');
  const [material, setMaterial] = useState('all');
  const [height, setHeight] = useState('all');

  const visibleTrees = filterTrees(trees, { query, material, height });
  const isFiltered = query !== '' || material !== 'all' || height !== 'all';

  function resetFilters() {
    setQuery('');
    setMaterial('all');
    setHeight('all');
  }

  return (
    <div className="page catalog-page">
      <h1 className="page-title">Каталог ялинок</h1>

      <div className="catalog-controls">
        <div className="catalog-search">
          <SearchInput value={query} onChange={setQuery} placeholder="Пошук за назвою..." />
        </div>
        <Select value={material} onChange={setMaterial} options={MATERIAL_OPTIONS} label="Матеріал" />
        <Select value={height} onChange={setHeight} options={HEIGHT_OPTIONS} label="Висота" />
        {isFiltered && (
          <PrimaryButton variant="secondary" onClick={resetFilters}>
            Скинути
          </PrimaryButton>
        )}
      </div>

      <p className="catalog-count">
        Знайдено: {visibleTrees.length} з {trees.length}
      </p>

      {visibleTrees.length > 0 ? (
        <TreeList trees={visibleTrees} />
      ) : (
        <p className="empty-message">Нічого не знайдено. Спробуйте змінити запит або фільтри.</p>
      )}
    </div>
  );
}

export default CatalogPage;
