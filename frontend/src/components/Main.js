// import api from '../utils/api.js';
import { memo, useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = memo((props) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container" onClick={props.onEditAvatar}>
            <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
          </div> 
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about-yourself">{currentUser.about}</p>
            <button className="profile__edit-button" type="button" aria-label="кнопка" onClick={props.onEditProfile} />
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="кнопка" onClick={props.onAddPlace} />
      </section>

      <section className="elements" aria-label="карточки">
        {props.cards.map((card) => (
          <Card 
            key={card.id} {...card} 
            onCardClick={props.onCardClick} 
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />)
        )}
      </section>

    </main>
  );
})

export default Main;