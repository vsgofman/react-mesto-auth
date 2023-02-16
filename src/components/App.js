import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Mesto from './Mesto';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      }).catch((err) => console.log(`Данные не загрузились. ${err}`))
  }, [])

  function handleEditProfileClick() { setIsEditProfilePopupOpen(true); }
  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true); }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true); }
  function handleCardClick(card) { setSelectedCard(card); }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => console.log(`С лайками какая-то проблема. ${err}`))
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => console.log(`Карточка не удалилась. ${err}`))
  }
  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch(err => console.log(`Данные профиля не были обновлены. ${err}`))
  }
  function handleUpdateAvatar({ avatar }) {
    api.editAvatar(avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err => console.log(`Не удалось обновить аватар. ${err}`))
  }
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err => console.log(`Карточка не добавилась. ${err}`))
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then(() => {
        navigate("/sign-in");
      })
  }

  function handleLoginSubmit(email, password) {
    auth.login(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token)
        console.log(localStorage.getItem("jwt"))
      }).then(() => {
        setLoggedIn(true)
        navigate("/")
      }).catch(err => console.log(`Не удаётся войти. ${err}`))
  }

  function signOut() {
    console.log('выход')
    localStorage.removeItem("jwt")
    navigate("/sign-in")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Routes>
              <Route
                path="/sign-up"
                element={<Register
                  onFormSubmit={handleRegisterSubmit} />}
              />
              <Route
                path="/sign-in"
                element={<Login
                  onFormSubmit={handleLoginSubmit} />}
              />
              <Route path="/"
                element={<ProtectedRoute
                  element={Mesto}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  signOut={signOut}
                />
                }
              />
            </Routes>
            {loggedIn && <Footer />}
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* Confirm delete */}
          <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            textButton="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;