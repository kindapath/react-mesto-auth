import { Link } from "react-router-dom";


// Хедер

function Header() {
  return (
    <header className="header page__header">
      <div className="header__logo" />

      <Link className="login__text" to="/signup">Регистрация</Link>
    </header>
  );
}

export default Header;
