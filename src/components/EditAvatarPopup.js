import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    /* Значение инпута, полученное с помощью рефа */

  }

  return (

    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <Input iName="avatar" iType="url" iref={avatarRef} iPlaceholder="Ссылка на аватар" />
    </PopupWithForm>

  )
}

export default EditAvatarPopup;
