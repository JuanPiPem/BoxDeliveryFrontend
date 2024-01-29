"use client";

import React, { useState } from "react";
import s from "./register.module.scss";
import Header from "commons/header/Header";
import UploadImage from "assets/img/UploadImage";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Link from "next/link";
import Eye from "assets/img/Eye";
import ClosedEye from "assets/img/ClosedEye";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className={s.registerContainer}>
      <Header text="Creá tu cuenta" />
      <div className={s.contentContainer}>
        <div className={s.content}>
          <div className={s.iconContainer}>
            <UploadImage />
          </div>
          <form action="submint" className={s.registerForm}>
            <input type="text" placeholder="Nombre" autoFocus />
            <input type="text" placeholder="Apellido" />
            <input type="email" placeholder="ejemplo@email.com" />
            <div className={s.inputPasswordContainer}>
              <input
                type={showPassword ? `text` : `password`}
                className={s.inputPassword}
                placeholder="**********"
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
                className={s.inputPassword}
                placeholder="Confirmar contraseña"
              />
              <div
                className={s.eyeContainer}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <ClosedEye /> : <Eye />}
              </div>
            </div>
          </form>
          <div className={s.firstButtonContainer}>
            <ButtonDarkBlue text="Crear" />
          </div>
          <Link href={"/login"}>
            <button className={s.loginButton}>Iniciar sesión</button>
          </Link>
          <Link href={"/login"}>
            <p className={s.link}>¿Ya tenés una cuenta?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
