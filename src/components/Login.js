//Login.js
import AuthForm from "./AuthForm"

export default function Login({ onLogin }) {

  return (
    <main className="content page__content">

      <AuthForm
      title="Войти"
      name="login"
      buttonText="Войти"
      onSubmit={onLogin}
      />

    </main>
  )
}
