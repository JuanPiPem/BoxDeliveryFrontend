import React from "react";
import s from "./login.module.scss";
import LoginBoxLogo from "assets/img/LoginBoxLogo";

const Login = () => {
  return (
    <div className={s.loginContainer}>
      <div className={s.loginContentContainer}>
        <div className={s.content}>
          <input
            type="email"
            className={s.input}
            placeholder="Email@example.com"
          />
          <input type="password" className={s.input} placeholder="*******" />
          <button className={s.buttonLogin}>Ingresar</button>
          <button className={s.buttonRecoverPassword}>
            Olvidé mi contraseña
          </button>
        </div>
        <div className={s.logoContainer}>
          <LoginBoxLogo />
        </div>
      </div>
    </div>
  );
};

export default Login;
