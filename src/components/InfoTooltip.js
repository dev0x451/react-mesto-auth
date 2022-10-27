function InfoTooltip({ icon, text, isOpen, onClose }) {

  return (

    <div className={"popup " + (isOpen ? "popup_opened" : "")} tabIndex="-1" >
      <div className="infotooltip__container">
        <img className="infotooltip__icon" src={icon} alt={`иконка: ${icon}`} />
        <h3 className="infotooltip__text">{text}</h3>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
