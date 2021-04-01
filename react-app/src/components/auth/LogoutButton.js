import React from "react";
import {useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { logout } from "../../services/auth";
import {removeUser} from '../../store/session'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(removeUser())
  };

  // return <button onClick={onLogout}>Logout</button>;
  return (
    <NavLink to="/" exact={true} activeClassName="active" onClick={onLogout}>
      Logout
    </NavLink>
  )
};

export default LogoutButton;
