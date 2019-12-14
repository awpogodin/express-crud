const { Router } = require('express');
const gamesRepository = require('../../repositories/games.repository');

const router = new Router();

function isFieldValid(item) {
  return !!item.trim();
}

function isValid({ name, developer, platforms }) {
  return isFieldValid(name) && isFieldValid(developer) && isFieldValid(platforms);
}

router.get('/', async (req, res) => {
  const games = await gamesRepository.getAll();
  res.json(games);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  if (isValid(req.body)) {
    const game = await gamesRepository.add(req.body);
    res.status(201).json(game);
  } else {
    res.status(404).end();
  }
});

router.get('/:id', async (req, res) => {
  const game = await gamesRepository.get(req.params.id);
  if (game) {
    res.json(game);
    return;
  }

  res.status(404).end();
});

router.patch('/:id', async (req, res) => {
  const game = await gamesRepository.get(req.params.id);
  const data = {
    name: '',
    developer: '',
    platforms: '',
  };
  if (game) {
    if ('name' in req.body && isFieldValid(req.body.name)) {
      data.name = req.body.name;
    } else {
      data.name = game.name;
    }
    if ('developer' in req.body && isFieldValid(req.body.developer)) {
      data.developer = req.body.developer;
    } else {
      data.developer = game.developer.join();
    }
    if ('platforms' in req.body && isFieldValid(req.body.platforms)) {
      data.platforms = req.body.platforms;
    } else {
      data.platforms = game.platforms.join();
    }
    await gamesRepository.delete(req.params.id);
    const updatedGame = await gamesRepository.add(data, req.params.id);
    res.json(updatedGame);
    return;
  }

  res.status(404).end();
});

router.delete('/:id', async (req, res) => {
  const game = await gamesRepository.get(req.params.id);
  if (game) {
    await gamesRepository.delete(req.params.id);
    res.json(game);
    return;
  }
  res.status(404).end();
});

module.exports = router;
