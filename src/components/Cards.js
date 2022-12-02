import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';


function Cards({ cards, selectedCard, onCardLike, onCardDelete, onEditProfile, onAddPlace, onAddPlaceClick, onEditAvatar, onCardClick, onClose,
  isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, onUpdateUser, onUpdateAvatar }) {

  return (

    <>
      <Main cards={cards} onCardLike={onCardLike} onCardDelete={onCardDelete} onEditProfile={onEditProfile} onAddPlaceClick={onAddPlaceClick} onEditAvatar={onEditAvatar} onCardClick={onCardClick} />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={onClose} onUpdateUser={onUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={onClose} onUpdateAvatar={onUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={onClose} onAddPlace={onAddPlace} />
      <ImagePopup cssName="gallery" card={selectedCard} onClose={onClose} />
    </>



  )
}

export default Cards;
