import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarInputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      link: avatarInputRef.current.value,
    });
  }
  const buttonLabelText = isLoading ? "Сохранение" : "Сохранить";
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      buttonLabel={buttonLabelText}
      onSubmit={handleSubmit}
    >
      <Input
        id='avatar'
        name='avatar'
        className='popup__text popup__text_type_avatar'
        type='url'
        placeholder='Ссылка на аватар'
        required
        inputRef={avatarInputRef}
      />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;