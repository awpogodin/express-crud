const { Router } = require('express');
const gamesRepository = require('../repositories/games.repository');

const router = new Router();

function isFieldValid(item) {
  console.log(item);
  return !!item.trim();
}

function isValid({ name, developer, platforms }) {
  return isFieldValid(name) && isFieldValid(developer) && isFieldValid(platforms);
}

router.get('/', async (req, res) => {
  const games = await gamesRepository.getAll();
  res.render('pages/games/view', { games });
});

router.get('/add', (req, res) => {
  const error = '';
  res.render('pages/games/add', { error });
});

router.post('/add', async (req, res) => {
  if (isValid(req.body)) {
    await gamesRepository.add(req.body);
    res.redirect('/games');
  } else {
    res.render('pages/games/add', { error: 'You have entered an empty field' });
  }
});

router.post('/del', async (req, res) => {
  await gamesRepository.delete(req.body.id);
  res.redirect('/games');
});

router.get('/edit/:id', async (req, res) => {
  const error = '';
  const game = await gamesRepository.get(req.params.id);
  res.render('pages/games/edit', { game, error });
});

router.post('/edit/:id', async (req, res) => {
  const game = req.body;
  if (isValid(req.body)) {
    await gamesRepository.update(req.params.id, req.body);
    res.redirect('/games');
  } else {
    res.render(`pages/games/edit`, {
      game,
      error: 'You have entered an empty field',
    });
  }
});

module.exports = router;
