import { memo, useEffect } from "react";

const ImagePopup = memo(({card, isOpen, onClose}) => {

  useEffect(() => {
    const close = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  if (card) {
    return (
      <div className={`popup popup_type_zoom-image popup_theme_dark ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__close-overlay" onClick={onClose}></div>
        <div className="popup__zoom-image">
          <img className="popup__image" src={card.link} alt={card.name} />
          <p className="popup__caption">{card.name}</p>
          <button className="popup__close-button" type="button" aria-label="кнопка" onClick={onClose} />
        </div>
      </div>
    );
  }
})

export default ImagePopup;