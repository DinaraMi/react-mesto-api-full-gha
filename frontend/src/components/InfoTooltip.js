import React from 'react';
import OK from '../images/OK.svg';
import notOK from '../images/notOK.svg';
import { usePopupClose } from '../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, successfully }) {
  const title = successfully ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container popup__container_type_tooltip'>
        <button className="popup__close-btn" type='button' aria-label='Закрытие попапа' onClick={onClose}></button>
        {successfully ? (<img className='popup__img' src={OK} alt='Успешно'></img>)
          : (<img className='popup__img' src={notOK} alt='Неуспешно'></img>)}
        <h3 className='popup__title popup__title_type_tooltip'>{title}</h3>
      </div>
    </div>
  )
}
export default InfoTooltip;