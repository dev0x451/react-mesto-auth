function Input({ iName, iType, value, minLength, maxLength, iPlaceholder, onChange, iref }) {

  return (
    <label htmlFor={'input-' + iName} className="popup__form-label">
      <input onChange={onChange} className={`popup__input popup__input_` + iName} ref={iref} type={iType} value={value} name={iName} id={'input-' + iName} minLength={minLength}
        maxLength={maxLength} placeholder={iPlaceholder} required />
      <span className={'popup__error input-' + iName + '-error'} />
    </label>
  )
}

export default Input;
