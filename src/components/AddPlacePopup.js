import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";
import { useEffect } from "react";
import Input from "./Input";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const {
    values,
    error,
    onChange,
    resetValidation,
    formValid
  } = useValidation();

  useEffect(() => {
    resetValidation();
  }, [isOpen])

  function handleClose() {
    onClose()
    resetValidation()
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values.name, values.link)
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      formValid={formValid}
    >
      <Input
        addclass="popup__input_field_title"
        name="name"
        type="text"
        placeholder="Название"
        value={values.name || ''}
        onChange={onChange}
        errorText={error.name}
        formValid={formValid}

        minLength={1}
        maxLength={30}
        required
      />

      <Input
        addclass="popup__input_field_link"
        name="link"
        type="url"
        value={values.link || ''}
        placeholder="Ссылка на картинку"
        onChange={onChange}
        errorText={error.link}
        formValid={formValid}

        required
      />
    </PopupWithForm>
  )
}
