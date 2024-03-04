"use client";

import React, { useState } from "react";
import s from "./login.module.scss";
import LoginBoxLogo from "assets/img/LoginBoxLogo";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Eye from "assets/img/Eye";
import ClosedEye from "assets/img/ClosedEye";
import Link from "next/link";
import axios from "axios";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
/* Si el login es de tipo repartidor(state Redux): hacer un classList.remove de la clase "s.heigthContentContainer1" y un classList.toggle de "s.heigthContentContainer2"; y también hacer un classList.remove del button que tiene la clase "s.displayNone" */

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.is_admin) {
          return router.push("/admin/manage-orders");
        } else {
          return router.push("/delivery-man/start-work-day");
        }
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
          <div className={s.buttonLogin} onClick={handleSubmit}>
            <ButtonDarkBlue text="Ingresar" />
          </div>
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
      <Toaster richColors position="top-center" expand={true} />
    </div>
  );
};

export default Login;
