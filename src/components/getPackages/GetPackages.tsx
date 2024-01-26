import React from "react";
import s from "./packagesAdmin.module.scss";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Vector from "assets/img/Vector";

const GetPackages = () => {
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Obtener Paquetes" />
        </div>
        <div className={s.packagesList}>
          <div className={s.headList}>
            <div>Cuantos paquetes repartiras hoy?</div>
          </div>

          <hr className={s.lastHr} />
          <div className={s.vector}>
            <Vector />
          </div>
        </div>
        <div className={`${s.button}`}>
          <ButtonDarkBlue text="Agregar" />
        </div>
      </div>
    </div>
  );
};

export default GetPackages;
