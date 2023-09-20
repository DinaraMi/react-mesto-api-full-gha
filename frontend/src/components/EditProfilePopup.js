import React, { useEffect, useContext, useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Input from './Input';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  }
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }
  const buttonLabelText = isLoading ? "Сохранение" : "Сохранить";
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      buttonLabel={buttonLabelText}
      onSubmit={handleSubmit}
    >
      <Input
        id='firstname'
        className='popup__text popup__text_type_name'
        type='text'
        name='firstname'
        minlength='2'
        maxlength='40'
        placeholder='Имя'
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <Input
        id='job'
        className='popup__text popup__text_type_job'
        type='text'
        name='job'
        minlength='2'
        maxlength='200'
        placeholder='О себе'
        required
        value={about || ''}
        onChange={handleAboutChange}
      />
    </PopupWithForm>
  )
}
export default EditProfilePopup;