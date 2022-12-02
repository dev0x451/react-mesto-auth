import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card?.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_active' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__heart-button ${isLiked ? 'element__heart-button_active' : ''}`

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img onClick={handleClick} className="element__image" src={card?.link} alt={card?.name} />
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" />
      <div className="element__description">
        <h2 className="element__name">{card?.name}</h2>
        <div className="element__likes">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" />
          <div className="element__likes-count">{card?.likes.length}</div>
        </div>
      </div>
    </article>
  )
}

export default Card;
