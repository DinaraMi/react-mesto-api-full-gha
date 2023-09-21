const mongoose = require('mongoose');

const Card = require('../models/card');
const { Ok, Created } = require('../utils/contants');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(Ok).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(Created).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError(`Некорректные данные: ${error.message}`));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() !== userId) {
        return next(new ForbiddenError('У вас нет прав для удаления этой карточки'));
      }
      return Card.findByIdAndRemove(cardId)
        .then((deletedCard) => {
          if (!deletedCard) {
            return next(new NotFoundError('Карточка не найдена'));
          }
          return res.send(deletedCard);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new ValidationError('Некорректный формат ID карточки');
  }
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(card.likes.length === 1 ? Ok : Created).json(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new ValidationError('Некорректный формат ID карточки');
  }
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(Ok).json(card);
    })
    .catch(next);
};
