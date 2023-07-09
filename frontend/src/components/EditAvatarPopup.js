import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect, memo, useRef } from 'react';

const EditAvatarPopup = memo((props) => {

  const avatarRef = useRef();

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [avatarIsValid, setAvatarIsValid] = useState(false);

  useEffect(() => {
    avatarIsValid ? setIsDisabled(false) : setIsDisabled(true);
  }, [avatarIsValid])

  useEffect(() => {
    avatarRef.current.value = '';
    setError(false);
    setIsDisabled(true);
  }, [props.isOpen])

  function checkValidity(evt) {
    const input = evt.target;
    if (!input.validity.valid) {
      setError(true);
      setErrorText(input.validationMessage);
      setAvatarIsValid(false);
    } else {
      setError(false);
      setErrorText('');
      setAvatarIsValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      isLoading={props.isLoading}
      children={
        <fieldset className="form__input-container"> 
          <input
            className={`form__input ${error ? "form__input_type_error" : ""}`}
            id="avatar-input"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
            onChange={checkValidity}
          />
          <span className={`form__input-error avatar-input-error ${error ? "form__input-error_active" : ""}`}>{errorText}</span>
        </fieldset>
      }
    />
  );
})

export default EditAvatarPopup;