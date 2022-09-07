import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "./Header.module.css";

const Header = () => {
  const [isAuth, setIsAuth] = useState(true);

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <div className="border-b bg-white">
      <div className="container flex justify-between items-center py-2">
        <div className={style.logo}>
          <Link to="/">Blog</Link>
        </div>

        {isAuth ? (
          <>
            <Link className={`${style.btn} ${style.colored}`} to="/addPost">
              Создать пост
            </Link>
            <button onClick={logout} className={style.btn}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={style.btn}>
              Войти
            </Link>
            <Link className={`${style.btn} ${style.colored}`} to="/register">
              Создать аккаунт
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
