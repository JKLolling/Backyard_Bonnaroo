import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router';
import Modal from 'react-modal';
import { login } from "../../services/auth";
import { closeModalLogin, openModalSignUp} from '../../store/modal';
import {setUser} from '../../store/session'

// styling
import c from './LoginForm.module.css';
import close from '../../images/close.svg';

Modal.setAppElement('#root');

function LoginFormModal({ authenticated, setAuthenticated }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const modalLogInState = useSelector((state) => state.modal.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const closeLogIn = () => {
    dispatch(closeModalLogin());
  };

  const closeLoginOpenSignUp = () => {
    dispatch(closeModalLogin());
    dispatch(openModalSignUp());
    return history.push('/sign-up')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user))
    } else {
      setErrors(user.errors);
    }
  };
  if (authenticated) {
    return <Redirect to="/" />;
  }


  // TODO: for security, change to only display 'Invalid credentials'
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

  const demoLogin = () => {
    setEmail('demo@demo.com');
    setPassword('password');
  };

  return (
    <Modal
      isOpen={modalLogInState}
      className={c.content}
      overlayClassName={c.overlay}
      shouldCloseOnOverlayClick={false}
      shouldFocusAfterRender={true}
    >
      <div className={c.container}>
        <div className={c.x__container}>
          <button onClick={closeLogIn} className={c.x__button}>
            <div className={c.x__div}>
              <img className={c.x__graphic} src={close} alt='close modal' />
            </div>
          </button>
        </div>
        {/* logo */}
        <h3 className={c.title}>Welcome to Sonic Fog</h3>
        <div className={c.form__container}>
          <form onSubmit={handleSubmit} className={c.form}>
            {errorRender}
            <div className={c.div}>
              <input
                className={c.input}
                name='email'
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className={c.div}>
              <input
                className={c.input}
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className={c.div}>
              <button type='submit' className={c.login__button}>
                Log In
							</button>
            </div>
            <p className={c.or}>OR</p>
            <div className={c.div}>
              <button
                id='demo-login'
                type='submit'
                onClick={demoLogin}
                className={c.demo}
              >
                Continue as Demo
							</button>
            </div>
          </form>
        </div>
        <div className={c.div__line}></div>
        <div className={c.div}>
          {/* this is a temp fix, we need to add an href to this anchor tag */}
          {/*eslint-disable-next-line */}
          <div onClick={(e) => closeLoginOpenSignUp()} className={c.signup}>
            Not on Sonic Fog yet? Sign up
					</div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginFormModal;
