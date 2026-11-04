const fs = require('fs');
const path = require('path');
const { ArtificialTree } = require('./models/ArtificialTree');

const FILE = path.join(__dirname, 'data', 'trees.json');

const SEED_TREES = [
  new ArtificialTree({ id: 1, manufacturer: 'Triumph Tree', height: 180, price: 3450, material: 'Комбінований (ПВХ + PE)' }),
  new ArtificialTree({ id: 2, manufacturer: 'Black Box Trees', height: 210, price: 8900, material: 'Лита хвоя (PE)' }),
  new ArtificialTree({ id: 3, manufacturer: 'Royal Christmas', height: 150, price: 5200, material: 'Поліетилен (PE)' }),
  new ArtificialTree({ id: 4, manufacturer: 'Kaemingk', height: 120, price: 1890, material: 'ПВХ' }),
  new ArtificialTree({ id: 5, manufacturer: 'Edelman', height: 240, price: 12750, material: 'Лита хвоя (PE)' }),
  new ArtificialTree({ id: 6, manufacturer: "Santa's Forest", height: 90, price: 950, material: 'ПВХ' }),
  new ArtificialTree({ id: 7, manufacturer: 'Crystal Pine', height: 165, price: 4100, material: 'Флокований ПВХ' }),
  new ArtificialTree({ id: 8, manufacturer: 'National Tree', height: 195, price: 6780, material: 'Комбінований (ПВХ + PE)' }),
];

function writeAll(trees) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(trees, null, 2));
}

function readAll() {
  if (!fs.existsSync(FILE)) writeAll(SEED_TREES);
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

module.exports = { readAll, writeAll };
