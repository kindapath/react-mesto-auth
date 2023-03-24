import { useEffect } from "react";
import useValidation from "../hooks/useValidation";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const {
    values,
    error,
    onChange,
    formValid,
    resetValidation
  } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values.avatar);
  }

  function handleClose() {
    onClose()
    resetValidation()
  }

  useEffect(() => {
    resetValidation()
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      formValid={formValid}>

      <Input
        addclass="popup__input_field_link"
        name="avatar"
        type="url"
        value={values.avatar || ''}
        onChange={onChange}
        formValid={formValid}
        errorText={error.avatar}

        placeholder="Ссылка на картинку"
        required
        />

    </PopupWithForm>
  )
}
