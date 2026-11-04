import { createContext, useContext, useState } from 'react';
import initialTrees from '../data/trees';

const TreesContext = createContext(null);

export function TreesProvider({ children }) {
  const [trees] = useState(initialTrees);

  return <TreesContext.Provider value={{ trees }}>{children}</TreesContext.Provider>;
}

export function useTrees() {
  return useContext(TreesContext);
}
