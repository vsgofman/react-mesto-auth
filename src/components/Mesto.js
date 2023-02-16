import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function Mesto({ cards, loggedIn, onAddPlace, onCardClick, onCardDelete, onCardLike, onEditAvatar, onEditProfile, signOut }) {
  return (
    <>
      <Header
        textButton="Кнопка"
        signOut={signOut}
      />
      <Main
        cards={cards}
        onAddPlace={onAddPlace}
        onCardClick={onCardClick}
        onCardDelete={onCardDelete}
        onCardLike={onCardLike}
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
      />
      <Footer />
    </>
  )
}

export default Mesto;