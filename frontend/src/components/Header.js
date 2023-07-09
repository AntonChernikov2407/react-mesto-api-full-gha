import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header(props) {

  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }
    if (width > 620) {props.onClose()};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width])

  function checkWidth() {
    if (width <= 620) {
      return(
        !props.isOpen ? 
          <button className="header__button header__button_open" onClick={props.onOpen} /> : 
          <button className="header__button header__button_close" onClick={props.onClose} />
      )
    } else {
      return(
        <div className="header__container">
          <p className="header__user-email">{props.email}</p>
          <Link to="/sign-in" className="link header__link header__link_signout" onClick={props.onSignOut}>Выйти</Link>
        </div>
      )
    }
  }

  function checkLocation() {
    if (location.pathname === '/sign-up') {
      return(<Link to="/sign-in" className="link header__link">Войти</Link>)
    } else {
      return(<Link to="/sign-up" className="link header__link">Регистрация</Link>)
    }
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      {props.loggedIn ? checkWidth() : checkLocation()}
    </header>
  );
}

export default Header;