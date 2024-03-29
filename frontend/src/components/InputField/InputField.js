import React from 'react';


function InputField(props) {
  return (
    <input
      className={props.className}
      type={props.settings.type}
      id={props.settings.id}
      aria-label={props.settings.ariaLabel}
      placeholder={props.settings.placeholder}
      name={props.settings.name}
      required={props.settings.required}
      minLength={props.settings.minLength}
      maxLength={props.settings.maxLength}
      onChange={props.onChange}
      value={props.value || ""}
      pattern={props.settings.regexp}
    />
  );
}

export default InputField;
