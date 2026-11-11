const express = require('express');
const cors = require('cors');
const { ArtificialTree, MATERIALS } = require('./models/ArtificialTree');
const { readAll, writeAll } = require('./storage');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.use('/api', (req, res, next) => {
  const delay = req.query.delay ? Number(req.query.delay) : 350;
  setTimeout(next, delay);
});

app.use(express.json());

function notFound(res) {
  return res.status(404).json({ errors: ['Ялинку не знайдено.'] });
}

app.get('/api/materials', (req, res) => {
  res.json(MATERIALS);
});

app.get('/api/trees', (req, res) => {
  let trees = readAll();
  const { search, query, material, height, sort } = req.query;

  const searchQuery = String(search || query || '').trim().toLowerCase();
  if (searchQuery) {
    trees = trees.filter((tree) => {
      const matchManufacturer = tree.manufacturer.toLowerCase().includes(searchQuery);
      const matchMaterial = tree.material.toLowerCase().includes(searchQuery);
      const matchDesc = tree.description.toLowerCase().includes(searchQuery);
      return matchManufacturer || matchMaterial || matchDesc;
    });
  }

  if (material && material !== 'all') {
    trees = trees.filter((tree) => tree.material.toLowerCase() === material.toLowerCase());
  }

  if (height && height !== 'all') {
    if (height === 'small') {
      trees = trees.filter((tree) => tree.height <= 120);
    } else if (height === 'medium') {
      trees = trees.filter((tree) => tree.height > 120 && tree.height <= 180);
    } else if (height === 'large') {
      trees = trees.filter((tree) => tree.height > 180);
    } else if (!isNaN(Number(height))) {
      trees = trees.filter((tree) => tree.height === Number(height));
    }
  }

  if (sort === 'price_asc') {
    trees.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    trees.sort((a, b) => b.price - a.price);
  } else if (sort === 'height_asc') {
    trees.sort((a, b) => a.height - b.height);
  } else if (sort === 'height_desc') {
    trees.sort((a, b) => b.height - a.height);
  } else if (sort === 'name_asc') {
    trees.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer, 'uk'));
  }

  res.json(trees);
});


app.get('/api/trees/:id', (req, res) => {
  const id = Number(req.params.id);
  const tree = readAll().find((item) => item.id === id);
  if (!tree) return notFound(res);
  res.json(tree);
});


app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({ errors: [status === 400 ? 'Некоректний JSON у запиті.' : 'Помилка сервера.'] });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});

