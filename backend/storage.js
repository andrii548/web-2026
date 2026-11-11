const fs = require('fs');
const path = require('path');
const { ArtificialTree } = require('./models/ArtificialTree');

const FILE = path.join(__dirname, 'data', 'trees.json');

function writeAll(trees) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(trees, null, 2), 'utf8');
}

function readAll() {
  if (!fs.existsSync(FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed.map((item) => new ArtificialTree(item));
  } catch (err) {
    return [];
  }
}

module.exports = { readAll, writeAll };

