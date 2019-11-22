const { Router } = require('express');
const gamesRepository = require('../../repositories/games.repository');

const router = new Router();

router.get('/', async (req, res) => {
  const games = await gamesRepository.getAll();
  res.json(games);
});

router.get('/:id', async (req, res) => {
  const game = await gamesRepository.get(req.params.id);
  if (game) {
    res.json(game);
    return;
  }

  res.status(404);
});

router.post('/', async (req, res) => {
  const game = await gamesRepository.add(req.body);
  res.status(201).json(game);
});

module.exports = router;
