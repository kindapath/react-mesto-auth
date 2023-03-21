import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(
      avatarRef.current.value,
    );
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={true}>
      <input
        ref={avatarRef}
        className="popup__input popup__input_field_link"
        name="link"
        type="url"
        id="avatar-input"
        placeholder="Ссылка на картинку"
        required />
      <span className="popup__input-error avatar-input-error" />
    </PopupWithForm>
  )
}
