import { useNavigate, NavLink } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ textButton, navLink, signOut }) {
  const navigate = useNavigate();

  // loggedIn !== true dispaly:block NavLink, подставляя path из props
  // loggedIn === true делаю видимой кнопку и почту

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      {<button className="header__button" onClick={signOut}>{textButton}</button>}
    </header>
  )
}

export default Header;