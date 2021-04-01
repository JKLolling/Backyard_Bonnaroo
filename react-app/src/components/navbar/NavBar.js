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
          <div className={c.sessionLinks}>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <li>
          <div className={c.sessionLinks}>
            <LogoutButton setAuthenticated={setAuthenticated} />
            UserPage(TEMP)
          </div>
        </li>
      </>
    )
  }

  return (
    <nav className={c.nav}>
      <ul className={c.nav_content}>
        <li>

          <div className={c.home_div}>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </div>


        </li>
        <li className={c.logo_li}>
          <div className={c.logo_div}>
            <NavLink to="/" exact={true} activeClassName="active" >
              <img src='static/logo1.jpg' alt='logo' className={c.logo}/>
            </NavLink>
          </div>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
