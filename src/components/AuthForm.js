
import useValidation from "../hooks/useValidation";
import Form from './Form';
import Input from "./Input";


function AuthForm({ title, name, children, buttonText, onSubmit }) {

  const {
    values,
    error,
    onChange,
    formValid
  } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values)
  }

  return (
    <section className="login page__login">
      <h1 className="login__title">{title}</h1>

      <Form name={name} onSubmit={handleSubmit}>
        <Input
          name="email"
          value={values.email || ''}
          onChange={onChange}
          type="email"
          addclass='popup__input_type_login'
          errorText={error.email}
          formValid={formValid}

          placeholder="Email"
          minLength={1}
          maxLength={30}
          required
        />

        <Input
          name="password"
          value={values.password || ''}
          onChange={onChange}
          type="password"
          addclass='popup__input_type_login'
          errorText={error.password}
          formValid={formValid}

          placeholder="Пароль"
          required
        />

        <button className={`popup__submit ${formValid ? "" : "popup__submit_disabled"} popup__submit_type_login`} disabled={formValid ? "" : true} type="submit">{buttonText}</button>

      </Form>
      {children}
    </section>
  );
}

export default AuthForm;
