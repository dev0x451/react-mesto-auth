import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { api } from '../utils/Api';
import { auth } from '../utils/Auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Cards from './Cards';
import Footer from './Footer';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";

import iconSuccess from '../images/Success.svg';
import iconFail from '../images/Fail.svg';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipIcon, setInfoTooltipIcon] = useState('');
  const [infoTooltipText, setInfoTooltipText] = useState('');

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [signInStatus, setSignInStatus] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.getUser().then((myUser) => {

      setCurrentUser(myUser);

    }).catch((err) => {

      console.log('userinfo not fetched: ', err);
    })
  }, []);
  // ^^ вызовется только один раз

  const [cards, setCards] = useState([]);

  useEffect(() => {

    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) auth.checkToken(jwtToken).then((res) => {
      if (res.data.email) {
        setUserEmail(res.data.email);
        setLoggedIn(true);
      }
    }).catch((err) => {
      console.log('ошибка проверки токена', err);
    })

    api.getInitialCards().then((cardsData) => {

      setCards(cardsData);

    }).catch((err) => {

      console.log('Cards or userinfo not fetched: ', err);
    })
  }, []);
  // ^^ вызовется только один раз


  useEffect(() => {

    if (loggedIn) history.push('/cards');
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

      setCards((state) =>
        state.map((c) =>
          c._id === card._id ? newCard : c))
    }).catch((err) => {
      console.log('ошибка постановки лайка: ', err);
    })

  }

  function handleCardDelete(card) {

    api.deleteCard(card?._id).then(
      () => {

        setCards((state) =>
          state.filter((c) =>
            c._id === card._id ? false : true))

      })
      .catch((err) => {
        console.log('ошибка удаления карточки: ', err);
      })

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(name, about) {

    api.setUser(name, about).then((newUser) => {

      setCurrentUser(newUser);
      closeAllPopups();

    })
      .catch((err) => {
        console.log('ошибка сохранения данных профиля: ', err);
      })

  }

  function handleUpdateAvatar(avatar) {

    api.setAvatar(avatar).then((newUser) => {

      setCurrentUser(newUser);
      closeAllPopups();

    })
      .catch((err) => {
        console.log('ошибка сохранения аватара: ', err);
      })

  }

  function handleAddPlace({ name, link }) {

    api.addCard(name, link).then((newCard) => {

      setCards([newCard, ...cards]);
      closeAllPopups();

    })
      .catch((err) => {
        console.log('ошибка сохранения аватара: ', err);
      })

  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  function handleInfoTooltipClose() {

    setIsInfoTooltipPopupOpen(false);
    if (signInStatus === 'signed-up') history.push('/sign-in')


  }

  function handleSubmitSignup(email, password) {

    auth.signup(email, password).then((response) => {

      if (response?.data) {
        setInfoTooltipIcon(iconSuccess);
        setInfoTooltipText('Вы успешно зарегистрировались!');
        setSignInStatus('signed-up');
        setIsInfoTooltipPopupOpen(true);
      }
    }).catch(() => {

      setInfoTooltipIcon(iconFail);
      setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
      setSignInStatus('failed');
      setIsInfoTooltipPopupOpen(true);

    })

  }

  function handleSubmitSignin(email, password) {

    auth.signin(email, password).then((response) => {

      localStorage.setItem('jwt', response.token);

      setLoggedIn(true)

    }).catch(() => {
      setInfoTooltipIcon(iconFail);
      setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
      setSignInStatus('signed-in');
      setIsInfoTooltipPopupOpen(true);

    })

  }

  function handleSignout() {

    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" aria-label="проект Место">
        <div className="page__container">
          <Header email={userEmail} onSignOut={handleSignout} />
          <Switch>
            <ProtectedRoute
              path="/cards"
              loggedIn={loggedIn}
              component={Cards}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onAddPlace={handleAddPlace}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              isEditProfilePopupOpen={isEditProfilePopupOpen}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              onUpdateUser={handleUpdateUser}
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closeAllPopups}
              selectedCard={selectedCard}
            />

            <Route path="/sign-up">
              <Register name="signup" headerCaption="Регистрация" buttonCaption="Зарегистрироваться" onSubmit={handleSubmitSignup} />
              <InfoTooltip icon={infoTooltipIcon} text={infoTooltipText} isOpen={isInfoTooltipPopupOpen} onClose={handleInfoTooltipClose} />
            </Route>

            <Route path="/sign-in">
              <Register name="signin" headerCaption="Вход" buttonCaption="Войти" onSubmit={handleSubmitSignin} />
              <InfoTooltip icon={infoTooltipIcon} text={infoTooltipText} isOpen={isInfoTooltipPopupOpen} onClose={handleInfoTooltipClose} />
            </Route>

            <Route path="*">
              <Redirect to="/cards" />
            </Route>
          </Switch>

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
