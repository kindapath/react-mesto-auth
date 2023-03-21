import closeImage from '../images/popup__close-icon.svg'

// Попап с картинкой
export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section className={`popup popup_type_pic ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container popup__container_type_pic">
        <button className="popup__close" type="button" onClick={onClose}>
          <img className="popup__close-image" src={closeImage} alt="Иконка закрытия" />
        </button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__text popup__text_type_pic">{card.name}</p>
      </div>
    </section>
  )
}
