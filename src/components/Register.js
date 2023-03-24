
// Register.js
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Register({ onRegister }) {

  return (
    <main className="content page__content">

      <AuthForm
        title="Регистрация"
        name="register"
        buttonText="Зарегистрироваться"
        onSubmit={onRegister}>
        <p className="login__text">Уже зарегистрированы? <Link className="login__link" to="/signin">Войти</Link></p>
      </AuthForm>

    </main >
  )
}
