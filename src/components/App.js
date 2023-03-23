import { useEffect, useState } from 'react'
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { api, authApi } from "../utils/api"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import registerSuccess from './../images/register_success.svg';
import registerFail from './../images/register_fail.svg';

function App() {
  // Навигация
  const navigate = useNavigate()

  // Стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipSuccessOpen, setIsInfoTooltipSuccessOpen] = useState(false);
  const [isInfoTooltipFailOpen, setIsInfoTooltipFailOpen] = useState(false);


  const [selectedCard, setSelectedCard] = useState({})

  // Стейты данных юзера
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('')

  // Стейт загрузки
  const [isLoading, setIsLoading] = useState(false);

  // Проверяем открыт ли какой-либо из попапов
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen


  // При монтировании и смене стейта логина проверится токен
  useEffect(() => {
    tokenCheck()
  }, [loggedIn])

  // Проверяем токен

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        authApi.getContent(token)
          .then((res) => {
            if (res) {
              // Записываем почту, пришедшую с сервера
              setEmail(res.data.email)

              // Логинимся и перенаправляем юзера на домашнюю страницу
              handleLogin();
              navigate('/')
            }
          })
      }
    }
  }

  // Стейты
  const [cards, setCards] = useState([])

  useEffect(() => {
    // Получаем изначальную информацию с сервера
    api.getInitialCards()
      .then((cardsData) => {

        // Получаем массив карточек
        setCards(cardsData)
      })
      .catch(err => console.log(err))
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.removeLike(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCards(newCards);
        })
        .catch(err => console.log(err))
    } else {
      api.likeCard(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCards(newCards)
        })
        .catch(err => console.log(err))
    }

  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        // Обновляем стейт
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    // Получаем изначальную информацию с сервера
    api.getUserInfo()
      .then((userData) => {

        // Получаем информацию профиля с сервера
        setCurrentUser(userData)
      })
      .catch(err => console.log(err))
  }, [])

  // Открываем аватар редактирования аватара

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  // Открываем попап редактирования профиля

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  // Открываем попап с добавлением карточки

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  // Кликаем на карточку

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  // Обновляем аватар

  function handleUpdateUser(name, about) {
    setIsLoading(true)
    api.updateUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Обновляем аватар
  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.updateAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Сабмитим добавление карточки
  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true)
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Регистрируемся
  function onRegister(formValues) {

    authApi.register(formValues)
      .then(() => {
        setIsInfoTooltipSuccessOpen(true)
        navigate('/signin')
      })
      .catch(err => {
        console.log(err)
        setIsInfoTooltipFailOpen(true)
      })
  }

  // Логинимся
  function onLogin(formValues) {

    authApi.authorize(formValues)
      .then((data) => {
        if (data.token) {
          handleLogin()
          navigate('/')
        }
      })
      .catch(err => {
        console.log(err)
        setIsInfoTooltipFailOpen(true)
      })
  }

  // Меняем состояние логина на тру
  function handleLogin() {
    setLoggedIn(true)
  }

  // Выходим из аккаунта
  // Меняем состояние логина на фолс
  function handleSignout() {
    setLoggedIn(false)
  }

  // Закрываем попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);

    setIsInfoTooltipSuccessOpen(false);
    setIsInfoTooltipFailOpen(false);
  }

  // Закрываем попапы на ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">


        <Header loggedIn={loggedIn} email={email} handleSignout={handleSignout} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <InfoTooltip
          name='tool'
          title='Вы успешно зарегистрировались!'
          image={registerSuccess}
          isOpen={isInfoTooltipSuccessOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name='tool'
          title='Что-то пошло не так!
          Попробуйте ещё раз.'
          image={registerFail}
          isOpen={isInfoTooltipFailOpen}
          onClose={closeAllPopups}
        />

        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}

              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards} />
          } />

          <Route path="/signup" element={<Register onRegister={onRegister} />} />
          <Route path="/signin" element={<Login onLogin={onLogin} handleLogin={handleLogin} />} />


        </Routes>
        <Footer />



      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
