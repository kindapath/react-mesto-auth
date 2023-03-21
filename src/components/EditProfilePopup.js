import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const {
    values,
    error,
    onChange,
    resetValidation,
    formValid
  } = useValidation();

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // Вставляем значения из контекста в стейт values
  useEffect(() => {
    resetValidation({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(
      values.name,
      values.about,
    );
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль?"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={formValid}
    >

      <input
        className="popup__input popup__input_field_name"
        name="name"
        type="text"
        id="name-input"
        placeholder="Имя"
        required minLength={2}
        maxLength={40}
        autoFocus
        value={values.name || ''}
        onChange={onChange}
      />
      <span className={`popup__input-error ${formValid ? '' : 'popup__input-error_active'}  name-input-error`}>{error.name}</span>

      <input className="popup__input popup__input_field_job"
        name="about"
        type="text"
        id="job-input"
        placeholder="Описание"
        required minLength={2}
        maxLength={200}
        value={values.about || ''}
        onChange={onChange}
      />
      <span className={`popup__input-error ${formValid ? '' : 'popup__input-error_active'}  job-input-error`}>{error.about}</span>

    </PopupWithForm>
  )
}
