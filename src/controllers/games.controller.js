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
  await gamesRepository.delete(req.body.name);
  res.redirect('/games');
});

router.post('/edit', async (req, res) => {
  if (req.body.oldName) {
    await gamesRepository.delete(req.body.oldName);
    await gamesRepository.add(req.body);
    res.redirect('/games');
  } else {
    const currentGameName = req.body.name;
    const game = await gamesRepository.find(currentGameName);
    res.render('pages/games/edit', { game });
  }
});

module.exports = router;
