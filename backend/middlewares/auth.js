const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Используем переменную окружения
    req.user = payload;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Ошибка аутентификации'));
  }
};
