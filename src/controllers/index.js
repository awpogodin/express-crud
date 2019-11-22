const { Router } = require('express');
const homeController = require('./home.controller');
const gamesController = require('./games.controller');

const router = new Router();

router.use('/', homeController);
router.use('/games', gamesController);

module.exports = router;
