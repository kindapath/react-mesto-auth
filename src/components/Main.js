import { useContext } from 'react'
import Card from "./Card"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

// Мейн

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {

  // Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar-hover" onClick={onEditAvatar}><img className="profile__avatar" src={currentUser.avatar} alt="Фотография профиля" /></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" onClick={onEditProfile} type="button" />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={onAddPlace} type="button" />
      </section>
      <section className="elements content__elements">

        {/* Создаем карточки */}

        {cards.map((card) => {
          return <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />
        })}
      </section>
    </main>
  )
}
