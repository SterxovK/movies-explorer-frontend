import React from 'react';
import LogoLink from '../LogoLink/LogoLink';

function Form(props) {
  return (
    <section id={props.name}>
      <form className="form" id={props.id} onSubmit={props.onSubmit}>
        <div className="form__container form__container_auth">
          <div className="form__header">
            <LogoLink />
            <h2 className="form__title">{props.title}</h2>
          </div>
          <fieldset className="form__input-container">
            {props.children}
          </fieldset>
          {props.Link}
        </div>
      </form>
    </section>
  );
}

export default Form;
