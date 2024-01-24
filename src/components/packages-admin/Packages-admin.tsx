import React from "react";
import s from "./packages-admin.module.scss";
import Header from "commons/header/Header";
import TableListPackages from "commons/tableListPackages/TableListPackages";
import Vector from "assets/img/Vector";

const getFormattedDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate
    .toLocaleString("es-ES", {
      month: "long",
    })
    .toUpperCase();
  const dayOfWeek = currentDate
    .toLocaleString("es-ES", { weekday: "short" })
    .slice(0, 3);
  return { month, day, dayOfWeek };
};

const Packages = () => {
  // const { month, day, dayOfWeek } = getFormattedDate();
  getFormattedDate();

  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Paquetes" />
        </div>
        <div className={s.packagesList}>
          <div className={s.headList}>
            <div>
              <h1 className={s.month}>Enero </h1>
              <h1 className={s.day}>
                {" "}
                mie <span className={s.bold}>/ 03</span>
              </h1>
            </div>
          </div>
          <div className={s.packagesNumber}>58 paquetes entregados</div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.lastHr} />
          <div className={s.vector}>
            <Vector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
