import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/Vector.svg';

function Header({ isLoggedIn, userEmail, onLogout }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/sign-in';
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {isLoggedIn ? (
        <div className="header__loggedIn">
          <p className="header__email">{userEmail}</p>
          <button onClick={onLogout} className="header__link">Выйти</button>
        </div>
      ) : (
        <div className="header__notLoggedIn">
          {isLoginPage ? (
            <Link to='/sign-up' className='header__link'>Регистрация</Link>
          ) : (
            <Link to='/sign-in' className='header__link'>Войти</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
