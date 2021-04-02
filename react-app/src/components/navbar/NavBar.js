import React, {useEffect, useRef} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from '../auth/LogoutButton';


//Styling
import c from './NavBar.module.css'

const NavBar = ({ authenticated, setAuthenticated }) => {

  const storeUserData = useSelector(store => store.session)
  const location = useLocation();
  const navContentRef = useRef()

  const pathIsMap = location.pathname.split('/')[1] === 'map'


  useEffect(() => {
    if (pathIsMap){
      navContentRef.current.style.width='94%'
    } else {
      navContentRef.current.style.width='55vw'
    }
  },[pathIsMap])

  // Sets whether the user sees Login/Signup or Logout
  let sessionLinks
  if (!authenticated){
    sessionLinks = (
      <>
        <li>
          <div className={c.sessionLinks}>
            {/* TODO: if you are on the home, navigate to the log in page. Otherwise, just open the modal */}
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
            <NavLink to={`/users/${storeUserData?.user?.id}`} exact={true} activeClassName="active">
              Profile
            </NavLink>
          </div>
        </li>
      </>
    )
  }

  return (
    <nav className={c.nav}>
      <ul className={c.nav_content} ref={navContentRef}>
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
              <img src='../static/logo.jpg' alt='logo' className={c.logo}/>
            </NavLink>
          </div>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
