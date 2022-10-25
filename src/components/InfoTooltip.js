function InfoTooltip({ icon, text, isOpen, onClose }) {

  console.log(icon, text, isOpen);


  return (


    <div className={"popup " + (isOpen ? "popup_opened" : "")} tabIndex="-1" >
      {/* <div className="popup popup_opened" tabIndex="-1" > */}
      <div className="popup__container">
        <img src={icon} alt="" />
        <h3 className=" popup__heading">{text}</h3>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
