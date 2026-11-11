import { useState, useEffect, useCallback, useRef } from 'react';
import SearchInput from '../components/SearchInput';
import Select from '../components/Select';
import PrimaryButton from '../components/PrimaryButton';
import TreeList from '../components/TreeList';
import Loader from '../components/Loader';
import { getTrees } from '../api/treesApi';
import { MATERIAL_OPTIONS, HEIGHT_OPTIONS } from '../utils/filterTrees';
import './CatalogPage.css';

const SORT_OPTIONS = [
  { value: '', label: 'Сортування: за замовчуванням' },
  { value: 'price_asc', label: 'Ціна: від дешевих до дорогих' },
  { value: 'price_desc', label: 'Ціна: від дорогих до дешевих' },
  { value: 'height_asc', label: 'Висота: за зростанням' },
  { value: 'height_desc', label: 'Висота: за спаданням' },
  { value: 'name_asc', label: 'Назва: А - Я' },
];

function CatalogPage() {
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [material, setMaterial] = useState('all');
  const [height, setHeight] = useState('all');
  const [sort, setSort] = useState('');

  const debounceTimerRef = useRef(null);

  const fetchCatalogTrees = useCallback(async (searchQuery, selectedMaterial, selectedHeight, selectedSort) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTrees({
        search: searchQuery,
        material: selectedMaterial,
        height: selectedHeight,
        sort: selectedSort,
      });
      setTrees(data);
    } catch (err) {
      setError('Не вдалося завантажити ялинки з сервера. Переконайтеся, що бекенд запущено (npm run server).');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchCatalogTrees(query, material, height, sort);
    }, 250);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, material, height, sort, fetchCatalogTrees]);

  const isFiltered = query !== '' || material !== 'all' || height !== 'all' || sort !== '';

  function resetFilters() {
    setQuery('');
    setMaterial('all');
    setHeight('all');
    setSort('');
  }

  return (
    <div className="page catalog-page">
      <h1 className="page-title">Каталог ялинок</h1>

      <div className="catalog-controls">
        <div className="catalog-search">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Пошук за назвою або матеріалом..."
          />
        </div>
        <Select
          value={material}
          onChange={setMaterial}
          options={MATERIAL_OPTIONS}
          label="Матеріал"
        />
        <Select
          value={height}
          onChange={setHeight}
          options={HEIGHT_OPTIONS}
          label="Висота"
        />
        <Select
          value={sort}
          onChange={setSort}
          options={SORT_OPTIONS}
          label="Сортування"
        />
        {isFiltered && (
          <PrimaryButton variant="secondary" onClick={resetFilters}>
            Скинути
          </PrimaryButton>
        )}
      </div>

      {error && (
        <div className="catalog-error-box">
          <p className="catalog-error-text">{error}</p>
          <PrimaryButton onClick={() => fetchCatalogTrees(query, material, height, sort)}>
            Спробувати знову
          </PrimaryButton>
        </div>
      )}

      {isLoading ? (
        <Loader message="Отримання ялинок із сервера..." />
      ) : (
        <>
          <p className="catalog-count">
            Знайдено ялинок: {trees.length}
          </p>

          {trees.length > 0 ? (
            <TreeList trees={trees} />
          ) : (
            <p className="empty-message">Нічого не знайдено. Спробуйте змінити запит або фільтри.</p>
          )}
        </>
      )}
    </div>
  );
}

export default CatalogPage;
