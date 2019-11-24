const { Router } = require('express');
const gamesRepository = require('../../repositories/games.repository');

const router = new Router();

function isFieldValid(item) {
  if (!item || item === '' || item.length < 2) {
    return false;
  }
  return true;
}

function isValid(data) {
  const { name, developers, platforms, genres } = data;
  return (
    isFieldValid(name) &&
    isFieldValid(developers) &&
    isFieldValid(platforms) &&
    isFieldValid(genres)
  );
}

router.get('/', async (req, res) => {
  const games = await gamesRepository.getAll();
  res.json(games);
});

router.post('/', async (req, res) => {
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
    developers: '',
    platforms: '',
    genres: '',
  };
  if (game) {
    if ('name' in req.body && isFieldValid(req.body.name)) {
      data.name = req.body.name;
    } else {
      data.name = game.name;
    }
    if ('developers' in req.body && isFieldValid(req.body.developers)) {
      data.developers = req.body.developers;
    } else {
      data.developers = game.developers.join();
    }
    if ('platforms' in req.body && isFieldValid(req.body.platforms)) {
      data.platforms = req.body.platforms;
    } else {
      data.platforms = game.platforms.join();
    }
    if ('genres' in req.body && isFieldValid(req.body.genres)) {
      data.genres = req.body.genres;
    } else {
      data.genres = game.genres.join();
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
