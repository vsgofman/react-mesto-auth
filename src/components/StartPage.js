import { Children, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './styles/StartPage.css';

function StartPage({ textButtonHeader, navLink, title, textButtonSubmit, onFormSubmit, children }) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let { email, password } = userData;
    onFormSubmit(email, password);
  }

  return (
    <>
      <Header
        textButton={textButtonHeader}
        navLink={navLink}
      />
      <div className="start-page">
        <h2 className="start-page__title">{title}</h2>
        <form className="form start-page__form">
          <input
            id="email-input"
            className="start-page__input"
            onChange={handleChange}
            value={userData.email || ''}
            type="email" name="email" placeholder="Email" required
          />
          <input
            id="password-input"
            className="start-page__input"
            onChange={handleChange}
            value={userData.password || ''}
            type="password" name="password" placeholder="Пароль" minLength="6" required
          />
          <button
            className="start-page__button"
            onClick={handleSubmit}
            type="submit" aria-label={textButtonSubmit}>{textButtonSubmit}</button>
        </form>
        {children}
      </div>
    </>
  )
}

export default StartPage;