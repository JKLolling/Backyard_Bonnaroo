import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Modal stuff
import {openModalLogin} from '../../store/modal'
import {useDispatch} from 'react-redux'

const ProtectedRoute = props => {
  const dispatch = useDispatch()

  if (!props.authenticated){
    dispatch(openModalLogin())
  }

  return (
    <Route {...props}>
      {(props.authenticated)? props.children  : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;
