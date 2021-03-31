import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useLocation } from 'react-router';
import Modal from 'react-modal';
import { signUp } from '../../services/auth';
import { closeModalSignUp, openModalLogin, openModalSignUp} from '../../store/modal';
import {setUser} from '../../store/session'

import c from './SignupForm.module.css';
import close from '../../images/close.svg';

Modal.setAppElement('#root');

function SignupFormModal({authenticated, setAuthenticated}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()

  const modalSignUpState = useSelector((state) => state.modal.signup);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(openModalSignUp())
  }, [dispatch])

  const closeSignUp = () => {
    dispatch(closeModalSignUp());
  };

  const closeSignUpOpenLogIn = () => {
    dispatch(closeModalSignUp());
    dispatch(openModalLogin());
    history.push('/login')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user))
      } else {
        setErrors(user.errors);
      }
    } else {
      setErrors(['Passwords must match'])
    }
  };
  if (authenticated) {
    return <Redirect to="/" />;
  }


  let errorRender;
  if (errors.length > 0) {
    errorRender = (
      <div className={c.div}>
        <ul style={{ color: 'red' }}>
          {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    );
  }

  let x__button = <div></div>
  if (location.pathname !== '/sign-up'){
    x__button = (
      <div className={c.x__container}>
        <button onClick={closeSignUp} className={c.x__button}>
          <div className={c.x__div}>
            <img className={c.x__graphic} src={close} alt='close modal' />
          </div>
        </button>
      </div>
    )
  }
  return (
    <Modal
      isOpen={modalSignUpState}
      className={c.content}
      overlayClassName={c.overlay}
      shouldCloseOnOverlayClick={false}
      shouldFocusAfterRender={true}
    >
      <div className={c.container}>
        {x__button}
        {/* LOGO */}
        <h3 className={c.title}>Welcome to Backyard Bonnaroo</h3>
        <h3 className={c.subtitle}>Live, Loud, and Local</h3>
        <div className={c.form__container}>
          <form onSubmit={handleSubmit} className={c.form}>
            {errorRender}
            <input
              type='text'
              className={c.input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Email'
              name='email'
              required
            />
            <input
              type='text'
              className={c.input}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder='Username'
              name='username'
              required
            />
            <input
              type='password'
              className={c.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Password'
              name='password'
              required
            />
            <input
              type='password'
              className={c.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder='Confirm Password'
              name='confirm password'
              required
            />
            <button type='submit' className={c.continue__button}>
              Continue
						</button>
          </form>
        </div>
        <div className={c.div__line}></div>
        <div className={c.div}>
          <div onClick={(e) => closeSignUpOpenLogIn()} className={c.signup}>
            Already a member? Log in
					</div>
        </div>
      </div>
    </Modal>
  );
}

export default SignupFormModal;
