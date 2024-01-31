"use client";

import React, { useState } from "react";
import s from "./tableListPackages.module.scss";
import Package from "assets/img/Package";
import Trash from "assets/img/Trash";
import StatusInProgress from "assets/img/StatusInProgress";
import StatusPending from "assets/img/StatusPending";
import StatusDelivered from "assets/img/StatusDelivered";

type Prop = {
  viewType: string;
  section: string;
  status: string;
  packageNumber: string;
  address: string;
  city: string;
};
//The viewType can be: "paquetes-admin", "perfil-repartidor" o "home-repartidor"
//The sections can be: "repartos-pendientes" "historial-repartos"
//The status can be: "pendiente", "en-curso" o "entregado"
//Example: <TableListPackages packageNumber="#0A235" address="Amenabar2356" city="CABA" viewType="paquetes-admin" section="repartos-pendientes" status="en-curso"/>

const TableListPackages = (prop: Prop) => {
  const [iniciarClicked, setIniciarClicked] = useState(false);

  const handleIniciarClick = () => {
    setIniciarClicked(true);
  };

  return (
    <>
      <div className={`${s.container}`}>
        <div className={`${s.div1}`}>
          <Package />
          <div className={`${s.div2}`}>
            <p className={`${s.txt} ${s.fontBold}`}>{prop.packageNumber}</p>
            <p className={`${s.txt} ${s.fontNormal}`}>{prop.address},</p>
            <p className={`${s.txt} ${s.fontNormal}`}>{prop.city}</p>
          </div>
        </div>
        <div className={`${s.div3}`}>
          {prop.viewType === "home-repartidor" ||
          prop.viewType === "perfil-repartidor" ? (
            <div className={`${s.statusContainer}`}>
              {prop.status === "pendiente" && !iniciarClicked ? (
                <StatusPending />
              ) : prop.status === "en-curso" ||
                (prop.status === "pendiente" && iniciarClicked) ? (
                <StatusInProgress />
              ) : (
                <StatusDelivered />
              )}
              <p className={`${s.statusText}`}>
                {prop.status === "pendiente" && !iniciarClicked
                  ? "PENDIENTE"
                  : prop.status === "en-curso" ||
                    (prop.status === "pendiente" && iniciarClicked)
                  ? "EN CURSO"
                  : "ENTREGADO"}
              </p>
            </div>
          ) : null}
          {(prop.viewType === "home-repartidor" &&
            prop.section === "repartos-pendientes" &&
            prop.status === "en-curso") ||
          prop.viewType === "paquetes-admin" ||
          prop.viewType === "perfil-repartidor" ||
          iniciarClicked ? (
            <div className={`${s.div3Aling}`}>
              <Trash />
            </div>
          ) : null}
          {prop.viewType === "home-repartidor" &&
          prop.section === "repartos-pendientes" &&
          prop.status === "pendiente" &&
          !iniciarClicked ? (
            <button className={`${s.button}`} onClick={handleIniciarClick}>
              Iniciar
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TableListPackages;
