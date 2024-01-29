"use client";

import React, { useEffect, useState } from "react";
import s from "./sendEmail.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Checked from "assets/img/Checked";
import Link from "next/link";

const SendEmail = () => {
  const [stepper, setStepper] = useState<number>(1);
  useEffect(() => {
    setTimeout(() => {
      return setStepper(3);
    }, 3000);
  }, [stepper]);
  return (
    <div className={s.loginContainer}>
      <div className={`${s.loginContentContainer}`}>
        <div className={s.content}>
          {stepper === 1 ? (
            <>
              <header id={s.first} className={s.header}>
                <h4 className={s.title}>Recuperar contraseña</h4>
                <p>Ingrese el correo electronico asociado a su cuenta de Box</p>
              </header>
              <input
                type="email"
                className={`${s.input}`}
                placeholder="Correo electronico"
                autoFocus
              />
              <div className={s.buttonLogin} onClick={() => setStepper(2)}>
                <ButtonDarkBlue text="Enviar email" />
              </div>
            </>
          ) : stepper === 2 ? (
            <div className={s.loaderContainer}>
              <header className={s.headerLoading}>
                <h4>Enviando email...</h4>
              </header>
              <div className={s.loader}></div>
            </div>
          ) : (
            stepper === 3 && (
              <div className={s.successContainer}>
                <Checked width={60} height={60} />
                <header className={s.header}>
                  <h4 className={s.title}>Email enviado con exito</h4>
                  <p>
                    Revisa tu casilla de correo electronico y sigue las
                    instrucciones para recuperar tu contraseña
                  </p>
                </header>
                <Link href={"/login"}>
                  <button className={s.buttonRecoverPassword}>Aceptar</button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
