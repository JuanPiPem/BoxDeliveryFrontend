import React from "react";
import s from "./register.module.scss";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";
import UploadImage from "assets/img/UploadImage";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Link from "next/link";

const Register = () => {
  return (
    <div className={s.registerContainer}>
      <Navbar />
      <Header text="Creá tu cuenta" />
      <div className={s.contentContainer}>
        <div className={s.content}>
          <div className={s.iconContainer}>
            <UploadImage />
          </div>
          <form action="submint" className={s.registerForm}>
            <input type="text" />
            <input type="text" />
            <input type="email" />
            <input type="password" />
            <input type="password" />
          </form>
          <ButtonDarkBlue text="Crear" />
          <button className={s.loginButton}>Iniciar sesión</button>
          <Link href={""}>
            <p>¿Ya tenés una cuenta?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
