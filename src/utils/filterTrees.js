import { MATERIALS } from '../data/trees';

export const MATERIAL_OPTIONS = [
  { value: 'all', label: 'Усі матеріали' },
  ...MATERIALS.map((material) => ({ value: material, label: material })),
];

export const HEIGHT_OPTIONS = [
  { value: 'all', label: 'Усі висоти' },
  { value: 'small', label: 'До 120 см', test: (height) => height <= 120 },
  { value: 'medium', label: '121–180 см', test: (height) => height > 120 && height <= 180 },
  { value: 'large', label: 'Понад 180 см', test: (height) => height > 180 },
];

export function filterTrees(trees, { query, material, height }) {
  const text = query.trim().toLowerCase();
  const heightOption = HEIGHT_OPTIONS.find((option) => option.value === height);

  return trees.filter((tree) => {
    const matchesText = [tree.manufacturer, tree.material, tree.description].some((field) =>
      field.toLowerCase().includes(text)
    );
    const matchesMaterial = material === 'all' || tree.material === material;
    const matchesHeight = !heightOption.test || heightOption.test(tree.height);

    return matchesText && matchesMaterial && matchesHeight;
  });
}
