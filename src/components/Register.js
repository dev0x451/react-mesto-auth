import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ name, headerCaption, buttonCaption, onSubmit }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (

    <div className="signin">
      <div className='signin__top'>
        <h2 className="signin__header">{headerCaption}</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <input className="signin__input" placeholder="E-mail" id="email" name="email" type="email" value={email} onChange={handleChangeEmail} />
          <input className="signin__input" placeholder="Пароль" id="password" name="password" type="password" value={password} onChange={handleChangePassword} />
          <div className='signin__bottom'>
            <button type="submit" className="signin__button">{buttonCaption}</button>
            (name === 'signup') && <Link className="signin__text" to="/sign-in">Уже зарегистрированы? Войти</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;
