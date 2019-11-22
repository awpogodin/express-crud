const { Router } = require('express');
const homeController = require('./home.controller');
const gamesController = require('./games.controller');
const apiControllers = require('./api');

const router = new Router();

router.use('/', homeController);
router.use('/games', gamesController);
router.use('/api', apiControllers);

module.exports = router;
