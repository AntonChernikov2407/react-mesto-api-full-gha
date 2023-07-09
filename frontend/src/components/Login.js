import { memo, useState, useEffect, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithValidation from './InputWithValidation.js';
import * as auth from '../utils/auth.js';

const Login = memo((props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const invalidEmail = createRef();
  const invalidPassword = createRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailIsValid, passwordIsValid])
  
  function handleInputChange({name, value}) {
    name === 'email' ? setEmail(value) : setPassword(value);
  }

  function setInputValidity({name, value}) {
    name === 'email' ? setEmailIsValid(value) : setPasswordIsValid(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isDisabled) {
      emailIsValid && !passwordIsValid ? invalidPassword.current.focus() : invalidEmail.current.focus();
    } else {
      auth.authorize(email, password)
        .then((data) => {
          if (data.token) {
            setEmail('');
            setPassword('');
            props.onLogin(data.token);
            navigate('/', {replace: true});
          }
        })
        .catch(err => console.log(err));
    }
  }

  return(
    <form className="form form_type_auth" name="login-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form__title form__title_type_auth">Вход</h2>
      <fieldset className="form__input-container form__input-container_type_auth"> 
        <InputWithValidation
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={email || ''}
          onChange={handleInputChange}
          setInputValidity={setInputValidity}
          isOpen={props.isOpen}
          typeAuth={true}
          ref={invalidEmail}
        />
        <InputWithValidation
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="20"
          value={password || ''}
          onChange={handleInputChange}
          setInputValidity={setInputValidity}
          isOpen={props.isOpen}
          typeAuth={true}
          ref={invalidPassword}
        />
      </fieldset>
      <button 
        className="form__submit-button form__submit-button_type_auth"
        type="submit"
      >
        Войти
      </button> 
    </form>
  )

})

export default Login;