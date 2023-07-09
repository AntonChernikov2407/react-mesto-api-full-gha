import { memo, useEffect } from "react";

const InfoToolTip = memo((props) => {

  useEffect(() => {
    const close = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return(
    <div className={`popup popup_type_info-tool-tip popup_theme_light ${props.isOpen && "popup_opened"}`}>
      <div className="popup__close-overlay" onClick={props.onClose}></div>
      <div className="popup__container popup__container_type_info-tool-tip">
        <div className={`popup__result-icon ${props.isSuccessfully && "popup__result-icon_type_successfully"}`}></div>
        <p className="popup__result-text">
          {props.isSuccessfully ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button className="popup__close-button" type="button" aria-label="кнопка" onClick={props.onClose} />
      </div>
    </div>
  )

})

export default InfoToolTip;