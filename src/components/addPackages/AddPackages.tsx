import React from "react";
import s from "./addPackages.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Header from "commons/header/Header";

const AddPackages = () => {
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <Header text="Agregar Paquetes" />
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
        <div className={`${s.button}`}>
          <ButtonDarkBlue text="Agregar" />
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
