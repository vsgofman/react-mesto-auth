import { NavLink } from 'react-router-dom';
import StartPage from "./StartPage";

function Login({ onFormSubmit }) {
  return (
    <StartPage
      textButtonHeader="Регистрация"
      navLink={<NavLink className="header__button" to="/sign-in" />}
      title="Вход"
      textButtonSubmit="Войти"
      onFormSubmit={onFormSubmit}
    />
  )
}

export default Login;