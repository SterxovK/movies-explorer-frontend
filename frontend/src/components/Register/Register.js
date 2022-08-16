import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

function Register(props) {
  const REGISTER_TITLE = 'Добро пожаловать!';
  const REGISTER_BUTTON_TEXT = 'Зарегистрироваться';
  const REGISTER_REQUEST_TEXT = 'Уже зарегистрированы?';
  const REGISTER_LINK_TEXT = 'Войти';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setformValid] = useState(false);

  const handleChangeName = (evt) => {
    const validName = /^[a-zA-Z- ]+$/.test(evt.target.value);

    if (evt.target.value.length < 2) {
      setNameError('Длина имени должна быть не менее 2 символов');
    } else if (evt.target.value.length > 30) {
      setNameError('Длина имени должна должна быть не более 30 символов');
    } else if (!validName) {
      setNameError('Имя должно быть написано латиницей');
    } else {
      setNameError('');
    }
    setName(evt.target.value);
  };

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
    props.onRegister(name, email, password);
  };

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setformValid(true);
    } else {
      setformValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return (
    <>
      <Form
        name="Register"
        id="form-register"
        title={REGISTER_TITLE}
        onSubmit={handleSubmit}
        Link={
          <p className="form-login__request-text">
            {REGISTER_REQUEST_TEXT}
            <Link to="/sign-in" className="form-login__register-link">
              {REGISTER_LINK_TEXT}
            </Link>
          </p>
        }
      >
        <label className="form__field form__field-text">
          Имя
          <input
            id="name-input"
            className="form__item"
            type="text"
            value={name}
            onChange={handleChangeName}
            required
          />
          <span id="name-input-error" className="form__item-error">
            {nameError}
          </span>
        </label>
        <label className="form__field form__field-text">
          E-mail
          <input
            id="email-input"
            className="form__item"
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
            className="form__item"
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
            {REGISTER_BUTTON_TEXT}
          </button>
        </div>
      </Form>
    </>
  );
}

export default Register;
