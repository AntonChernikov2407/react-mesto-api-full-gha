import PopupWithForm from './PopupWithForm.js';
import { memo } from 'react';

const DeleteCardPopup = memo((props) => {

  const card = props.card;

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      btnText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children=""
    />
  )

});

export default DeleteCardPopup;