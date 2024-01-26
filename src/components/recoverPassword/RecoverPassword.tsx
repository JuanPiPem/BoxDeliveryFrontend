"use client";

import React, { useState } from "react";
import s from "./recoverPassword.module.scss";
import ClosedEye from "assets/img/ClosedEye";
import Eye from "assets/img/Eye";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";

const RecoverPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={s.loginContainer}>
      <div
        className={`${s.loginContentContainer} ${s.heigthContentContainer1}`}
      >
        <div className={s.content}>
          <header className={s.header}>Recuperar contraseña</header>
          <div className={s.inputPasswordContainer}>
            <input
              type={showPassword ? `text` : `password`}
              className={s.input}
              placeholder="Nueva contraseña"
              autoFocus
            />
            <div
              className={s.eyeContainer}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <ClosedEye /> : <Eye />}{" "}
            </div>
          </div>
          <div className={s.inputPasswordContainer}>
            <input
              type={showConfirmPassword ? `text` : `password`}
              className={s.input}
              placeholder="Confirmar contraseña"
            />
            <div
              className={s.eyeContainer}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <ClosedEye /> : <Eye />}
            </div>
          </div>
          <div className={s.buttonLogin}>
            <ButtonDarkBlue text="Cambiar contraseña" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
