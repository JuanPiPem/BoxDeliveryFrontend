"use client";

import React, { useState } from "react";
import s from "./login.module.scss";
import LoginBoxLogo from "assets/img/LoginBoxLogo";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Eye from "assets/img/Eye";

/* Si el login es de tipo repartidor(state Redux): hacer un classList.remove de la clase "s.heigthContentContainer1" y un classList.toggle de "s.heigthContentContainer2"; y también hacer un classList.remove del button que tiene la clase "s.displayNone" */

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={s.loginContainer}>
      <div
        className={`${s.loginContentContainer} ${s.heigthContentContainer1}`}
      >
        <div className={s.content}>
          <input
            type="email"
            className={`${s.input}`}
            placeholder="Email@example.com"
          />
          <div className={s.inputPasswordContainer}>
            <input
              type={showPassword ? `text` : `password`}
              className={`${s.input}`}
              placeholder="***********"
            />
            <div
              className={s.eyeContainer}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye />
            </div>
          </div>
          <div className={s.buttonLogin}>
            <ButtonDarkBlue text="Ingresar" />
          </div>
          <div>
            <button className={`${s.buttonSignUp} ${s.displayNone}`}>
              Crear Cuenta
            </button>
          </div>
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
