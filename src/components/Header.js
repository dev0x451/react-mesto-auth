import { Link, Route } from 'react-router-dom';
import logo from '../images/mesto-logo.svg';

function Header({ email, onSignOut }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto Russia" />
      <Route path="/cards">
        <div className="header__wrapper">
          <span className="header__user">{email}</span>
          <span className="header__logout" onClick={onSignOut}>Выйти</span>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link className="header__auth-link" to="/sign-in">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__auth-link" to="/sign-up">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;
