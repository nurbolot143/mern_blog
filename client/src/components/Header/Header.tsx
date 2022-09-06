import React from "react";
import { Link, NavLink } from "react-router-dom";

import style from "./Header.module.css";

const Header = () => {
  return (
    <div className="border-b bg-white">
      <div className="container flex justify-between items-center py-2">
        <div className={style.logo}>
          <Link to="/">Blog</Link>
        </div>

        <div className="auth">
          <NavLink to="/login" className={`${style.btn} ${style.login}`}>
            Войти
          </NavLink>
          <Link className={`${style.btn} ${style.register}`} to="/register">
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
