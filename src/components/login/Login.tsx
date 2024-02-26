"use client";

import React, { useState } from "react";
import s from "./login.module.scss";
import LoginBoxLogo from "assets/img/LoginBoxLogo";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Eye from "assets/img/Eye";
import ClosedEye from "assets/img/ClosedEye";
import Link from "next/link";
import axios from "axios";
/* Si el login es de tipo repartidor(state Redux): hacer un classList.remove de la clase "s.heigthContentContainer1" y un classList.toggle de "s.heigthContentContainer2"; y también hacer un classList.remove del button que tiene la clase "s.displayNone" */
import dotenv from "dotenv";
dotenv.config();

const Login = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  // para que no me salte error de eslint las use asi
  email;
  passowrd;
  const [showPassword, setShowPassword] = useState(false);
  const isAdmin = false;
  const apiUrl = process.env.NEXT_PUBLIC_PORT_API_BACK;
  const handleSubmit = (e: React.FormEvent) => {
    e.currentTarget;
    axios
      .post(
        `${apiUrl}api/login`,
        { email, passowrd },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data;

        localStorage.setItem("token", data.token);

        axios
            withCredentials: true,
          })
          .then((resp) => {
            const message = resp.data;
            console.log(message);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className={s.loginContainer}>
      <div className={s.loginContentContainer}>
        <div className={s.content}>
          <input
            type="email"
            className={s.input}
            id={s.margin1}
            placeholder="Correo electronico"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={s.inputPasswordContainer}>
            <input
              type={showPassword ? `text` : `password`}
              className={`${s.input}`}
              id={s.margin2}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={s.eyeContainer}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <ClosedEye /> : <Eye />}
            </div>
          </div>
          {/* Hardcodeado la redireccion a la siguiente vista por que esto va a depender de la rspuesta del back e ira con un handleSubmit. */}
          <Link
            href={
              isAdmin ? "/admin/manage-orders" : "/delivery-man/start-work-day"
            }
          >
            <div className={s.buttonLogin} onClick={handleSubmit}>
              <ButtonDarkBlue text="Ingresar" />
            </div>
          </Link>
          <Link href={"/delivery-man/register"}>
            <div style={{ width: "100%" }}>
              <button className={s.buttonSignUp}>Crear Cuenta</button>
            </div>
          </Link>
          <Link href={"/send-email"}>
            <button className={s.buttonRecoverPassword}>
              Olvidé mi contraseña
            </button>
          </Link>
        </div>
        <div className={s.logoContainer}>
          <LoginBoxLogo />
        </div>
      </div>
      <div className={s.background}></div>
    </div>
  );
};

export default Login;
