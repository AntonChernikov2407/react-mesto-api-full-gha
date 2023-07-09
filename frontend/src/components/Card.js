import { memo, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Card = memo(({
  id, 
  link, 
  name, 
  likes, 
  owner, 
  onCardClick, 
  onCardLike, 
  onCardDelete}) => {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked && 'element__like-button_active'}`);

  function handleClick() {
    onCardClick({link, name});
  } 

  function handleLikeClick() {
    onCardLike({likes, id});
  }

  function handleDeleteClick() {
    onCardDelete({id});
  }

  return(
    <article className="element">
      {isOwn && <button className="element__delete-button" type="button" aria-label="кнопка" onClick={handleDeleteClick} />}
      <img className="element__image" src={link} alt={name} onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="кнопка" />
          <p className="element__like-count">{likes.length}</p>
        </div>
      </div>
    </article>
  );

})

export default Card;