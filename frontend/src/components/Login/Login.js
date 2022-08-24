import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

function Login(props) {
  const LOGIN_TITLE = 'Рады видеть!';
  const LOGIN_BUTTON_TEXT = 'Войти';
  const LOGIN_REQUEST_TEXT = 'Ещё не зарегистрированы?';
  const LOGIN_LINK_TEXT = 'Регистрация';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setformValid] = useState(false);

  const handleChangeEmail = (evt) => {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      evt.target.value
    );

    if (!validEmail) {
      setEmailError('Неверный формат почты');
    } else {
      setEmailError('');
    }
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    if (evt.target.value.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
    } else {
      setPasswordError('');
    }
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  };

  useEffect(() => {
    if (props.loggedIn) {
      setEmail('');
      setPassword('');
    }
  }, [props.loggedIn]);

  useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <>
      <Form
        name="Login"
        id="form-login"
        title={LOGIN_TITLE}
        onSubmit={handleSubmit}
        Link={
          <p className="form-login__request-text">
            {LOGIN_REQUEST_TEXT}
            <Link to="/signup" className="form-login__register-link">
              {LOGIN_LINK_TEXT}
            </Link>
          </p>
        }
      >
        <label className="form__field form__field-text">
          E-mail
          <input
            id="email-input"
            className={`form__item ${
              emailError ? 'form__item-error' : 'form__item_color'
            }`}
            type="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          <span id="name-input-error" className="form__item-error">
            {emailError}
          </span>
        </label>

        <label className="form__field form__field-text">
          Пароль
          <input
            id="password-input"
            className={`form__item ${passwordError ? 'form__item-error' : ''}`}
            type="password"
            value={password}
            onChange={handleChangePassword}
            required
          />
          <span id="name-input-error" className="form__item-error">
            {passwordError}
          </span>
        </label>

        <div className="form__handlers">
          <div className="form__item-error form__item-response">
            {props.messege}
          </div>
          <button
            className={`submit__button-form ${
              !formValid ? 'submit__button-form_disabled' : ''
            }`}
            type="submit"
            disabled={!formValid}
          >
            {LOGIN_BUTTON_TEXT}
          </button>
        </div>
      </Form>
    </>
  );
}

export default Login;
