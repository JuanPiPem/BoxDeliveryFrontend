import React from "react";
import s from "./login.module.scss";
import LoginBoxLogo from "assets/img/LoginBoxLogo";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";

/* Si el login es de tipo repartidor(state Redux): hacer un classList.remove de la clase "s.heigthContentContainer1" y un classList.toggle de "s.heigthContentContainer2"; y también hacer un display block del button que tiene la clase "s.buttonSignUp" */

const Login = () => {
  return (
    <div className={s.loginContainer}>
      <div
        className={`${s.loginContentContainer} ${s.heigthContentContainer1}`}
      >
        <div className={s.content}>
          <input
            type="email"
            className={`${s.input} ${s.marginFirstInput}`}
            placeholder="Email@example.com"
          />
          <input
            type="password"
            className={`${s.input} ${s.marginSecondtInput}`}
            placeholder="*******"
          />
          <div className={s.buttonLogin}>
            <ButtonDarkBlue text="Ingresar" />
          </div>
          <div>
            <button className={s.buttonSignUp} style={{ display: "none" }}>
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
