//InfoTooltip.js
import closeImage from '../images/popup__close-icon.svg'

export default function InfoTooltip({ name, title, image, onClose, isOpen }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`} >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close" onClick={onClose} type="button">
          <img className="popup__close-image" src={closeImage} alt="Иконка закрытия" />
        </button>
        <img className="popup__image popup__image_type_tool" src={image} />
        <h2 className={`popup__text popup__text_type_${name}`}>{title}</h2>
      </div>
    </section>
  )
}
