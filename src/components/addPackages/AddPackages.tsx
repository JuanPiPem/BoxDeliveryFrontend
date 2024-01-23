import React from "react";
import s from "./addPackages.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";

const AddPackages = () => {
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.navBar}>
        <Navbar />
      </div>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Agregar Paquetes" />
        </div>
        <div className={s.form}>
          <div className={s.content}>
            <input
              type="text"
              className={`${s.input}`}
              placeholder="Dirección"
            />
            <input
              type="text"
              className={`${s.input}`}
              placeholder="Nombre de quien recibe"
            />
            <input
              type="text"
              className={`${s.input}`}
              placeholder="Peso del paquete (Kg)"
            />
          </div>
          <div className={`${s.content} ${s.divDate}`}>
            <label htmlFor="deadLine" className={`${s.labelInputDate}`}>
              Fecha de entrega
            </label>
            <input type="date" id="deadLine" className={`${s.inputDate}`} />
          </div>
        </div>
        <div>
          <ButtonDarkBlue text="Agregar" />
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
