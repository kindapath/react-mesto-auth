import { useContext } from 'react'
import removeImage from '../images/element__remove.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


// Карточка

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__remove ${isOwn ? 'element__remove_visible' : 'element__remove_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="element">
      <img className="element__image" src={card.link} onClick={handleClick} alt={card.name} />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button">
        <img className="element__remove-image" src={removeImage} alt="Иконка удаления" />
      </button>
      <div className="element__description">
        <p className="element__title">{card.name}</p>

        <div className="element__like-group">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="element__like-num">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
