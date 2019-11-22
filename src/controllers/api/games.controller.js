const { Router } = require('express');
const gamesRepository = require('../../repositories/games.repository');

const router = new Router();

function isValid(data) {
  const { name, developers, platforms, genres } = data;
  function validation(item) {
    if (!item || item === '' || item.length < 2) {
      return false;
    }
    return true;
  }
  return (
    validation(name) &&
    validation(developers) &&
    validation(platforms) &&
    validation(genres)
  );
}

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

  res.status(404).end();
});

router.post('/', async (req, res) => {
  if (isValid(req.body)) {
    const game = await gamesRepository.add(req.body);
    res.status(201).json(game);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
