const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const { Created, Ok } = require('../utils/contants');

module.exports.createUser = (req, res, next) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь',
    avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      const userToCreate = {
        name,
        about,
        avatar,
        email,
        password: hash,
      };
      return User.create(userToCreate);
    })
    .then((user) => {
      const responseData = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      };
      return res.status(Created).send(responseData);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(`Некорректные данные: ${error.message}`));
      }
      return next(error);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(Ok).send(users))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      return res.status(Ok).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(`Пользователь не найден: ${error.message}`));
      }
      return next(error);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      return res.status(Ok).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(`Некорректные данные: ${error.message}`));
      }
      return next(error);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      return res.status(Ok).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(`Некорректные данные: ${error.message}`));
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const secretKey = process.env.JWT_SECRET || 'default_secret_key';
      const token = jwt.sign(
        { _id: user._id },
        secretKey,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((userInfo) => {
      if (!userInfo) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(200).send(userInfo);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(`Некорректные данные: ${error.message}`));
      }
      return next(error);
    });
};
