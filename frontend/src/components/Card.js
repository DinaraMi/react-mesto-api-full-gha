import React, { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Trash from '../images/Trash.png'

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `group__vector ${isLiked && 'group__vector_active'}`
  )
  const handleClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card);
  }
  const handleDeleteClick = () => {
    onCardDeleteClick(card._id)
  }
  return (
    <div className="group__element">
      <img className="group__mask" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && <button className='group__delite' onClick={handleDeleteClick}>
        <img className="group__img" src={Trash} alt="Картинка удаления" />
      </button>}
      <div className="group__text">
        <h2 className="group__paragraph">{card.name}</h2>
        <div className="group__likes">
          <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
          <p className="group__counter_likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
export default Card