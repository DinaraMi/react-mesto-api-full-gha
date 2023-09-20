import React, { useContext, useState } from 'react';
import vectorButton from '../images/vectorButton.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    console.log("Mouse entered")
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    console.log("Mouse left")
    setIsHovered(false);
  }
  return (
    <main className="content">
      {currentUser && (
        <section className="profile">
          <div className="profile__avatar-container">
            <button
              className="profile__avatar-button"
              type="button"
              aria-label="Обновить аватарку"
              onClick={onEditAvatar}
            >
              {currentUser.avatar && (
                <img
                  className="profile__avatar"
                  src={currentUser.avatar}
                  alt="Аватар"
                />
              )}
              <span
                className={`profile__avatar-edit-icon ${isHovered ? "profile__avatar-edit-icon_active" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></span>
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__informs">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              >
                <img className="profile__vector" src={vectorButton} alt="Кнопка редактирования" />
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить картинку"
            onClick={onAddPlace}
          ></button>
        </section>
      )}
      <section className="group">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteClick={onCardDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;