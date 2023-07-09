import { memo, useEffect } from "react";

const PopupWithForm = memo((props) => {
  
  useEffect(() => {
    const close = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  
  return (
    <div className={`popup popup_type_${props.name} popup_theme_light ${props.isOpen && "popup_opened"}`}>
      <div className="popup__close-overlay" onClick={props.onClose}></div>
      <div className="popup__container">
        <form className="form" name={`${props.name}-form`} onSubmit={props.onSubmit} noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button 
            className={
              `form__submit-button 
              ${props.name === "delete-card" && "form__submit-button_margin_top"}
              ${props.isDisabled ? "form__submit-button_inactive" : ""}`
            } 
            type="submit"
            disabled={props.isDisabled}
          >
            {props.isLoading ? "Сохранение..." : props.btnText}
          </button> 
        </form> 
        <button className="popup__close-button" type="button" aria-label="кнопка" onClick={props.onClose} />
      </div>
    </div>
  );
})

export default PopupWithForm;