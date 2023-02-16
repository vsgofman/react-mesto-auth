import { Link, NavLink } from 'react-router-dom';
import StartPage from "./StartPage";

function Register({ onFormSubmit }) {
  return (
    <StartPage
      textButtonHeader="Войти"
      navLink={<NavLink className="header__button" to="/sign-in" />}
      title="Регистрация"
      textButtonSubmit="Зарегистрироваться"
      onFormSubmit={onFormSubmit}>
      <div className="start-page__signin">
        <p className="start-page__login-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="start-page__login-link">Войти</Link>
      </div>
    </StartPage>
  )
}

export default Register;