import React from "react";

import style from "./login.module.css";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Авторизация</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input type="email" className={style.input} />
        <input type="password" className={style.input} />
        <button type="submit" className={style.btn}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
