const { Router } = require('express');
const gamesRepository = require('../repositories/games.repository');

const router = new Router();

router.get('/', async (req, res) => {
  const games = await gamesRepository.getAll();
  res.render('pages/games/view', { games });
});

router.get('/add', (req, res) => {
  res.render('pages/games/add');
});

router.post('/add', async (req, res) => {
  await gamesRepository.add(req.body);
  res.redirect('/games');
});

router.post('/del', async (req, res) => {
  await gamesRepository.delete(req.body.id);
  res.redirect('/games');
});

router.get('/edit/:id', async (req, res) => {
  const game = await gamesRepository.get(req.params.id);
  res.render('pages/games/edit', { game });
});

router.post('/edit/:id', async (req, res) => {
  const { oldId } = req.body;
  await gamesRepository.delete(req.params.id);
  await gamesRepository.add(req.body, oldId);
  res.redirect('/games');
});

module.exports = router;
