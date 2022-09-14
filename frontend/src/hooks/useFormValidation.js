import { useState, useCallback } from "react";

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });

    let valid = target.closest("form").checkValidity();

    if (name === "email") {
      valid = validateEmail(value);
      if (!valid) {
        setErrors({
          ...errors,
          email: "check email",
        });
      }
    }

    setIsValid(valid);
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
