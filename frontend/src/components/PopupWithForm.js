import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, isLoading, buttonLabel, children }) {
  usePopupClose (isOpen, onClose);
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" aria-label="Закрытие попапа" onClick={onClose}></button>
        <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          <form className={`popup__form-element popup__form-element_type_${name}`} name={`${name}-form`} onSubmit={onSubmit} >
            {children}
            <button
              className='popup__save'
              type="submit"
              aria-label="Сохранить редактирование"
            >
              {isLoading ? `${buttonLabel}...` : buttonLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PopupWithForm;