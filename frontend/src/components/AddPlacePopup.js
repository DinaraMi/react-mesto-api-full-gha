import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useForm } from "../hooks/useForm";
import { usePopupClose } from "../hooks/usePopupClose";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
  });
  useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        link: "",
      });
    }
  }, [isOpen, setValues]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      title: values.name,
      link: values.link,
    });
  };
  const buttonLabelText = isLoading ? "Создание" : "Создать";
  
  return (
    <PopupWithForm
      title="Новое место"
      name="new-place"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      isLoading={isLoading}
      buttonLabel={buttonLabelText}
    >
      <Input
        id="newPlace"
        name="name"
        className="popup__text popup__text_type_title"
        type="text"
        placeholder="Место"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ''}
        onChange={handleChange}
      />
      <Input
        id="link"
        name="link"
        className="popup__text popup__text_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}
export default AddPlacePopup;