import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';


//Styling
import c from './NavBar.module.css'

const NavBar = ({ authenticated, setAuthenticated }) => {

  // Sets whether the user sees Login/Signup or Logout
  let sessionLinks
  if (!authenticated){
    sessionLinks = (
      <>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <li>
        <LogoutButton setAuthenticated={setAuthenticated} />
      </li>
    )
  }

  return (
    <nav className={c.nav}>
      <ul className={c.nav_content}>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
