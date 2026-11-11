import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTrees } from '../api/treesApi';
import initialTrees from '../data/trees';

const TreesContext = createContext(null);

export function TreesProvider({ children }) {
  const [trees, setTrees] = useState(initialTrees);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrees = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrees(params);
      setTrees(data);
      return data;
    } catch (err) {
      setError(err.message || 'Помилка завантаження даних');
      return initialTrees;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrees();
  }, [fetchTrees]);

  return (
    <TreesContext.Provider value={{ trees, setTrees, loading, error, refreshTrees: fetchTrees }}>
      {children}
    </TreesContext.Provider>
  );
}

export function useTrees() {
  return useContext(TreesContext);
}
