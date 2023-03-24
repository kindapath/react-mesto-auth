//InfoTooltip.js
import Popup from './Popup'

export default function InfoTooltip({ name, title, image, onClose, isOpen }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <img className="popup__image popup__image_type_tool" src={image} alt="Информация о запросе" />
      <h2 className={`popup__text popup__text_type_${name}`}>{title}</h2>
    </Popup>
  )
}
