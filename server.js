

const express = require('express');
const path = require('path');
const { ArtificialTree, MATERIALS } = require('./models/ArtificialTree');
const { readAll, writeAll } = require('./storage');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function findTrees(search = '') {
  const query = String(search).trim().toLowerCase();
  return readAll().filter((tree) => tree.manufacturer.toLowerCase().includes(query));
}

function notFound(res) {
  return res.status(404).json({ errors: ['Ялинку не знайдено.'] });
}

app.get('/api/materials', (req, res) => {
  res.json(MATERIALS);
});


app.get('/api/trees', (req, res) => {
  const trees = findTrees(req.query.search);
  if (req.query.sort === 'price_desc') trees.sort((a, b) => b.price - a.price);
  res.json(trees);
});


app.get('/api/trees/total', (req, res) => {
  const total = findTrees(req.query.search).reduce((sum, tree) => sum + tree.price, 0);
  res.json({ total });
});

app.get('/api/trees/:id', (req, res) => {
  const tree = readAll().find((item) => item.id === Number(req.params.id));
  if (!tree) return notFound(res);
  res.json(tree);
});


app.post('/api/trees', (req, res) => {
  const errors = ArtificialTree.validate(req.body ?? {});
  if (errors.length > 0) return res.status(400).json({ errors });

  const trees = readAll();
  const id = Math.max(0, ...trees.map((tree) => tree.id)) + 1;
  const tree = new ArtificialTree({ ...req.body, id });

  trees.push(tree);
  writeAll(trees);
  res.status(201).json(tree);
});

app.put('/api/trees/:id', (req, res) => {
  const id = Number(req.params.id);
  const trees = readAll();
  const index = trees.findIndex((tree) => tree.id === id);
  if (index === -1) return notFound(res);

  const errors = ArtificialTree.validate(req.body ?? {});
  if (errors.length > 0) return res.status(400).json({ errors });

  trees[index] = new ArtificialTree({ ...req.body, id });
  writeAll(trees);
  res.json(trees[index]);
});

app.delete('/api/trees/:id', (req, res) => {
  const id = Number(req.params.id);
  const trees = readAll();
  if (!trees.some((tree) => tree.id === id)) return notFound(res);

  writeAll(trees.filter((tree) => tree.id !== id));
  res.json({ message: 'Ялинку видалено.' });
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({ errors: [status === 400 ? 'Некоректний JSON у запиті.' : 'Помилка сервера.'] });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
