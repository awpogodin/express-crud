const { Router } = require('express');
const gamesController = require('./games.controller');

const router = new Router();

router.use('/games', gamesController);

module.exports = router;
