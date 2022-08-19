import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import MenuButton from '../MenuButton/MenuButton';
import LogoLink from '../LogoLink/LogoLink';
import Navigation from '../Navigation/Navigation';

function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changedName, setChangedName] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false);

   function handleNameChange(e) {
     setChangedName(true);
     const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

     if (e.target.value.length < 2) {
       setNameError('Длина имени должна быть не менее 2 символов');
     } else if (e.target.value.length > 30) {
       setNameError('Длина имени должна должна быть не более 30 символов');
     } else if (!validName) {
       setNameError('Имя должно быть указано латиницей');
     } else {
       setNameError('');
     }
     setName(e.target.value);
   }

   function handleEmailChange(e) {
     setChangedEmail(true);
     const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
       e.target.value
     );

     if (!validEmail) {
       setEmailError('Неверный формат почты');
     } else {
       setEmailError('');
     }
     setEmail(e.target.value);
   }

    function changeInputDisabled() {
      setIsInputDisabled(!isInputDisabled);
    }

    function handleSubmit(evt) {
      evt.preventDefault();
      props.onEditUser({
        name,
        email,
      });
      changeInputDisabled();
    }
  
  return (
    <section className="profile">
      <div className="profile__header-container">
        <LogoLink />
        <Navigation />
        <MenuButton onOpenMenu={props.onOpenMenu} />
      </div>
      <form className="form__profile" id="profile" onSubmit={handleSubmit}>
        <div className="form__container_auth">
          <h2 className="form__heading-profile">Привет, Константин!</h2>
          <fieldset className="form__inputs">
            <div className="form__input-container-profile">
              <label className="form__field-profile">
                Имя
                <input
                  id="profile-name"
                  className={`form__item-profile ${
                    changedName && nameError ? 'form__item-profile_error' : ''
                  }`}
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  disabled={!isInputDisabled}
                />
              </label>
            </div>
            <span className="form__item-profile_error form__profile_span">
              {nameError}
            </span>
            <div className="form__input-container-profile form__input-container_border">
              <label className="form__field-profile">
                Почта
                <input
                  id="profile-email"
                  className={`form__item-profile ${
                    changedEmail && emailError ? 'form__item-profile_error' : ''
                  }`}
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={!isInputDisabled}
                />
              </label>
            </div>
            <span className="form__item-profile_error">{emailError}</span>
            <div className="form__handlers">
              <div className="form__item-message">{}</div>
              <button
                className={`submit__button-profile ${
                  !formValid || name < 2 || email < 2
                    ? 'submit__button-profile_disabled'
                    : ''
                }`}
                type="submit"
                disabled={!formValid || name < 2 || email < 2}
                onClick={changeInputDisabled}
              >
                Редактировать
              </button>

              <Link
                to="/sign-in"
                className="form__exit"
                onClick={props.onSignOut}
              >
                Выйти из аккаунта
              </Link>
            </div>
          </fieldset>
        </div>
      </form>
    </section>
  );
}

export default Profile;