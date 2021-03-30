import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

//Modal stuff
import {openModalLogin} from '../../store/modal'
import {useDispatch} from 'react-redux'

const ProtectedRoute = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.authenticated){
      dispatch(openModalLogin())
    }
  }, [props, dispatch])

  return (
    <Route {...props}>
      {(props.authenticated)? props.children  : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;
