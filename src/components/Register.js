

import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";

export default function Register({ onRegister }) {

  const {
    values,
    error,
    onChange,
    formValid,
    resetValidation
  } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values)
    console.log('submit reg')
  }

  return (
    <main className="content page__content">
      <section className="login page__login">
        <h1 className="login__title">Регистрация</h1>

        <form className={`popup__form popup__form_type_login`} name='register' onSubmit={handleSubmit} noValidate>
          <input
            className="popup__input popup__input_type_login"
            name="email"
            type="email"
            id="email-input"
            placeholder="Email"
            minLength={1}
            maxLength={30}
            required
            value={values.email || ''}
            onChange={onChange}
          />
          <span className={`popup__input-error ${formValid ? '' : 'popup__input-error_active'}`}>{error.email}</span>
          <input
            className="popup__input popup__input_type_login"
            name="password"
            type="password"
            id="password-input"
            placeholder="Пароль"
            required
            value={values.password || ''}
            onChange={onChange}
          />
          <span className={`popup__input-error ${formValid ? '' : 'popup__input-error_active'}`}>{error.password}</span>

          <button className={`popup__submit ${formValid ? "" : "popup__submit_disabled"} popup__submit_type_login`} disabled={formValid ? "" : true} type="submit">Зарегистрироваться</button>
        </form>

        <p className="login__text">Уже зарегистрированы? <Link className="login__text" to="/signin">Войти</Link></p>
      </section>
    </main>
  )
}
