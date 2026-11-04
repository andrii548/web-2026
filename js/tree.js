
const DEFAULT_TREE_IMAGE = 'img/default-tree.svg';
const STORAGE_KEY = 'artificial-trees';

const MATERIALS = [
  'ПВХ',
  'Поліетилен (PE)',
  'Комбінований (ПВХ + PE)',
  'Флокований ПВХ',
  'Лита хвоя (PE)',
];

class ArtificialTree {
  constructor(id, manufacturer, height, price, material, image = '') {
    this.id = id;
    this.manufacturer = manufacturer; 
    this.height = Number(height);     
    this.price = Number(price);       
    this.material = material;         
    this.image = image;               
  }
}

const SEED_TREES = [
  new ArtificialTree(1, 'Triumph Tree', 180, 3450, 'Комбінований (ПВХ + PE)'),
  new ArtificialTree(2, 'Black Box Trees', 210, 8900, 'Лита хвоя (PE)'),
  new ArtificialTree(3, 'Royal Christmas', 150, 5200, 'Поліетилен (PE)'),
  new ArtificialTree(4, 'Kaemingk', 120, 1890, 'ПВХ'),
  new ArtificialTree(5, 'Edelman', 240, 12750, 'Лита хвоя (PE)'),
  new ArtificialTree(6, "Santa's Forest", 90, 950, 'ПВХ'),
  new ArtificialTree(7, 'Crystal Pine', 165, 4100, 'Флокований ПВХ'),
  new ArtificialTree(8, 'National Tree', 195, 6780, 'Комбінований (ПВХ + PE)'),
];


function getTrees() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : SEED_TREES;
}

function saveTrees(trees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}

function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' грн';
}
