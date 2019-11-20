const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.render('pages/home');
});

module.exports = router;
