const router = require('express').Router();
const loginRouter = require('./login');
const registrRouter = require('./registr');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.post('/signin', loginRouter);
router.post('/signup', registrRouter);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
