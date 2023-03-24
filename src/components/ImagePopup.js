
import Popup from './Popup'

// Попап с картинкой
export default function ImagePopup({ card, onClose, isOpen, name }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__text popup__text_type_pic">{card.name}</p>
    </Popup>
  )
}
