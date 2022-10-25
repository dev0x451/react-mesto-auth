import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = '';
      linkRef.current.value = '';
    }
  }, [isOpen]);


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
    /* Значение инпута, полученное с помощью рефа */

  }

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Создать">
      <Input iName="title" iref={nameRef} iType="text" minLength="2" maxLength="30" iPlaceholder="Название места" />
      <Input iName="link" iref={linkRef} iType="url" iPlaceholder="Ссылка на картинку" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;



