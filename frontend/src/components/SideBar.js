import { Link } from 'react-router-dom';

function SideBar(props) {

  return(
    <nav className={`sidebar ${props.isOpen && "sidebar_opened"}`}>
      <p className="sidebar__user-email">{props.email}</p>
      <Link to="/sign-in" className="link sidebar__link" onClick={props.onSignOut}>Выйти</Link>
    </nav>
  )

}

export default SideBar;