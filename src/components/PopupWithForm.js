import SubmitButton from './SubmitButton';

function PopupWithForm({ name, isOpen, title, onClose, children, buttonText, onSubmit }) {

  return (

    <div className={`popup popup_${name} ` + (isOpen ? "popup_opened" : "")} tabIndex="-1" >
      <div className="popup__container">
        <h3 className=" popup__heading">{title}</h3>
        <form onSubmit={onSubmit} className={`popup__form popup__form_${name}`} name={`${name}-form`} noValidate>
          {children}
          <SubmitButton caption={buttonText} />
        </form>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
      </div>
    </div>

  )
}

export default PopupWithForm;
