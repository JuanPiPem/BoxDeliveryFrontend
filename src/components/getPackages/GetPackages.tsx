import React from "react";
import s from "./getPackages.module.scss";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Vector from "assets/img/Vector";
import Checked from "assets/img/Checked";
import Unchecked from "assets/img/Unchecked";

const GetPackages = () => {
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Obtener Paquetes" />
        </div>
        <div className={s.packagesList}>
          <div className={s.headList}>
            <div>¿Cuantos paquetes repartiras hoy?</div>
          </div>
          <div className={s.addressList}>
            <Checked />
            <div className={s.address}>Amenabar 2356, CABA</div>
          </div>
          <hr className={s.lastHr} />
          <div className={s.addressList}>
            <Checked />
            <div className={s.address}>Av Carabobo y Rivadavia, CABA</div>
          </div>
          <hr className={s.lastHr} />
          <div className={s.addressList}>
            <Checked />
            <div className={s.address}>Melian 1242, CABA</div>
          </div>
          <hr className={s.lastHr} />
          <div className={s.addressList}>
            <Unchecked />
            <div className={s.address}>Castillo 670, CABA</div>
          </div>
          <hr className={s.lastHr} />
          <div className={s.addressList}>
            <Unchecked />
            <div className={s.address}>Av Gaiba 1255, CABA</div>
          </div>
          <hr className={s.lastHr} />
          <div className={s.addressList}>
            <Unchecked />
            <div className={s.address}>Tacuari 1797, CABA</div>
          </div>
          <hr className={s.lastHr} />

          <div className={s.addressList}>
            <Unchecked />
            <div className={s.address}>Maipu y Medrano, CABA</div>
          </div>
          <hr className={s.lastHr} />
          <div className={s.addressList}>
            <Unchecked />
            <div className={s.address}>Membrillar 338, CABA</div>
          </div>
          <hr className={s.lastHr} />

          <div className={s.vector}>
            <Vector />
          </div>
        </div>
        <div className={`${s.button}`}>
          <ButtonDarkBlue text="Iniciar Jornada" />
        </div>
      </div>
    </div>
  );
};

export default GetPackages;
