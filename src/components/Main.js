import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlaceClick, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="профиль">
        <div className="profile__info-container">
          <div onClick={onEditAvatar} className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser?.avatar} alt="аватар пользователя" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name"> {currentUser?.name} </h1>
            <button onClick={onEditProfile} type="button" className="profile__edit-button" />
            <p className="profile__job">{currentUser?.about}</p>
          </div>
        </div>
        <button onClick={onAddPlaceClick} type="button" className="profile__add-button" />
      </section>
      <section className="elements" aria-label="карточки">

        {cards.map((card) => {
          return (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
        })}

      </section>
    </main>
  )
}

export default Main;
