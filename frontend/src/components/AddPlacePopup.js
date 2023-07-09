import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect, memo } from 'react';
import InputWithValidation from './InputWithValidation.js';

const AddPlacePopup = memo((props) => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [linkIsValid, setLinkIsValid] = useState(false);

  useEffect(() => {
    if (nameIsValid && linkIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nameIsValid, linkIsValid])

  useEffect(() => {
    setName('');
    setLink('');
    setIsDisabled(true);
    setNameIsValid(false);
    setLinkIsValid(false);
  }, [props.isOpen])

  function handleInputChange({name, value}) {
    name === 'place' ? setName(value) : setLink(value);
  }

  function setInputValidity({name, value}) {
    name === 'place' ? setNameIsValid(value) : setLinkIsValid(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({name, link});
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      btnText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      isLoading={props.isLoading}
      children={
        <fieldset className="form__input-container"> 
          <InputWithValidation
            type="text"
            name="place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={name || ''}
            onChange={handleInputChange}
            setInputValidity={setInputValidity}
            isOpen={props.isOpen}
          />
          <InputWithValidation
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            value={link || ''}
            onChange={handleInputChange}
            setInputValidity={setInputValidity}
            isOpen={props.isOpen}
          />
        </fieldset>
      }
    />
  );
})

export default AddPlacePopup;