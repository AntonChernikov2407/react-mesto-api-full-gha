import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useState, useEffect, memo, useContext } from 'react';
import InputWithValidation from './InputWithValidation.js';

const EditProfilePopup = memo((props) => {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [aboutIsValid, setAboutIsValid] = useState(true);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  useEffect(() => {
    if (nameIsValid && aboutIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nameIsValid, aboutIsValid])

  function handleInputChange({name, value}) {
    name === 'name' ? setName(value) : setDescription(value);
  }

  function setInputValidity({name, value}) {
    name === 'name' ? setNameIsValid(value) : setAboutIsValid(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      isLoading={props.isLoading}
      children={
        <fieldset className="form__input-container"> 
          <InputWithValidation
            type="text"
            name="name"
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleInputChange}
            setInputValidity={setInputValidity}
            isOpen={props.isOpen}
          />
          <InputWithValidation
            type="text"
            name="about"
            placeholder="Расскажите о себе"
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleInputChange}
            setInputValidity={setInputValidity}
            isOpen={props.isOpen}
          />
        </fieldset>
      }
    />
  );
})

export default EditProfilePopup;