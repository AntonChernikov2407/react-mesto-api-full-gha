import { useState, useEffect, forwardRef } from "react";

const InputWithValidation = forwardRef((props, ref) => {

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setError(false);
  }, [props.isOpen])

  function checkValidity(evt) {
    const input = evt.target;
    props.onChange({name: input.name, value: input.value});
    if (!input.validity.valid) {
      setError(true);
      setErrorText(input.validationMessage);
      props.setInputValidity({name: input.name, value: false});
    } else {
      setError(false);
      setErrorText('');
      props.setInputValidity({name: input.name, value: true});
    }
  }

  return(
    <>
      <input
        className={`form__input ${props.typeAuth && "form__input_type_auth"} ${error ? "form__input_type_error" : ""}`}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength || ''}
        maxLength={props.maxLength || ''}
        required
        value={props.value || ''}
        onChange={checkValidity}
        ref={ref}
      />
      <span className={`form__input-error ${props.name}-input-error ${error ? "form__input-error_active" : ""}`}>{errorText}</span>
    </>
  )

})

export default InputWithValidation;

