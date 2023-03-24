import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";
import Input from "./Input";

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

      <Input
        className="popup__input popup__input_field_name"
        name="name"
        type="text"
        placeholder="Имя"
        value={values.name || ''}
        onChange={onChange}
        formValid={formValid}
        errorText={error.name}

        required
        minLength={2}
        maxLength={40}
        autoFocus
      />


      <Input className="popup__input popup__input_field_job"
        name="about"
        type="text"
        placeholder="Описание"
        value={values.about || ''}
        formValid={formValid}
        errorText={error.about}
        onChange={onChange}

        required
        minLength={2}
        maxLength={200}
      />

    </PopupWithForm>
  )
}
