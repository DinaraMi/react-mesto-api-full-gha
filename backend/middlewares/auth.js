const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
    return next();
  } catch (error) { // Здесь изменена переменная err на error
    return next(new UnauthorizedError('Ошибка аутентификации')); // Создаем и передаем кастомную ошибку
  }
};
