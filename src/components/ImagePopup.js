//import placeholder from '../images/placeholder.jpg';

function ImagePopup({ cssName, card, onClose }) {

  return (
    <div className={`popup popup-${cssName} ` + (card ? "popup_opened" : "")} tabIndex="-1" >
      <div className="popup-gallery__container">
        <div onClick={onClose} className="popup__close-button">
        </div>
        <img className="popup-gallery__image" src={card?.link} alt={card?.name} />
        <p className="popup-gallery__caption">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
