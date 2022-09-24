import React, {useState} from "react";

import InputField from "../InputField/InputField";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import SubmitButton from "../SubmitButton/SubmitButton";

import { ReactComponent as SearchFormIcon } from "../../images/SearchForm/search-form-icon.svg";

function SearchForm({ onSubmit, searchTerm, isFavorite = false}) {
  const [term, setTerm] = useState('');
  const [short, setShort] = useState(false);
  const [formValid, setFormValid] = useState(false);


  const handleTermChange = (evt) => {
    setTerm(evt.target.value)
    if (evt.target.value.length > 0) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }


  const handleCheckBoxChange = (evt) => {
    setShort(evt.target.checked);
    if (term || isFavorite) {
      sendInputData(term, evt.target.checked);
    }
  };

  const sendInputData = (iterm, ishort) => {
    onSubmit({term: iterm, short: ishort});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendInputData(term, short);
  };

  React.useEffect(() => {
    if (searchTerm && searchTerm.term) {
      setTerm(searchTerm.term)
      setShort(searchTerm.short)
      setFormValid(true)
    }
  }, [searchTerm])

  const SEARCH_FORM_STYLE_SETTINGS = {
    form: "search-form",
    icon: "search-form__icon",
    textInput: "search-form__text-input",
    submitButton: "search-form__submit-button",
    checkboxInput: "search-form__checkbox-input",
    checkboxLabel: "search-form__checkbox-label",
    checkboxSlider: "search-form__checkbox-slider",
    checkboxOnFocus: "search-form__checkbox-label_focus",
  };

  const SEARCH_TEXT_INPUT_SETTINGS = {
    type: "text",
    id: "search-text",
    ariaLabel: "поиск фильма",
    placeholder: "Фильм",
    name: "search",
    maxLength: 30,
    required: false,
  };

  const SHORTFILM_FILTER_CHECKBOX_INPUT_SETTINGS = {
    type: "checkbox",
    id: "filter-shortfilm",
    label: "Короткометражки",
    name: "shortfilm",
    required: false,
  };

  const SUBMIT_BUTTON_SETTINGS = {
    className: "",
    type: "submit",
    title: "Найти",
  };

  return (

    <form className={SEARCH_FORM_STYLE_SETTINGS.form} onSubmit={handleSubmit}>
      <SearchFormIcon className={SEARCH_FORM_STYLE_SETTINGS.icon} />
      <InputField
        settings={SEARCH_TEXT_INPUT_SETTINGS}
        className={SEARCH_FORM_STYLE_SETTINGS.textInput}
        onChange={handleTermChange}
        value={term}
      />
      <FilterCheckbox
        inputClassName={SEARCH_FORM_STYLE_SETTINGS.checkboxInput}
        labelClassName={SEARCH_FORM_STYLE_SETTINGS.checkboxLabel}
        sliderClassName={SEARCH_FORM_STYLE_SETTINGS.checkboxSlider}
        onFocusClassName={SEARCH_FORM_STYLE_SETTINGS.checkboxOnFocus}
        settings={SHORTFILM_FILTER_CHECKBOX_INPUT_SETTINGS}
        onChange={handleCheckBoxChange}
        value={short}
      />
      <SubmitButton
        className={SEARCH_FORM_STYLE_SETTINGS.submitButton}
        settings={SUBMIT_BUTTON_SETTINGS}
        disabled={!formValid}
      />
    </form>
  );
}

export default SearchForm;
