import React from "react";
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
//The status can be: "pendiente", "en-curso" o "entrecgado"
//Example: <TableListPackages packageNumber="#0A235" address="Amenabar2356" city="CABA" viewType="paquetes-admin" section="repartos-pendientes" status="en-curso"/>

const TableListPackages = (prop: Prop) => {
  return (
    <>
      <div className={`${s.container}`}>
        <div className={`${s.div1}`}>
          <Package />
          <div className={`${s.div2}`}>
            <p className={`${s.txt} ${s.fontBold}`}>{prop.packageNumber}</p>
            <p className={`${s.txt} ${s.fontNormal}`}>{prop.address},</p>
            <p className={`${s.txt} ${s.fontNormal}`}>{prop.city}</p>
            {/*             <p className={`${s.txt} ${s.fontBold}`}>#0A235,</p>
            <p className={`${s.txt} ${s.fontNormal}`}>Amenabar2356,</p>
            <p className={`${s.txt} ${s.fontNormal}`}>CABA</p> */}
          </div>
        </div>
        <div className={`${s.div3}`}>
          {prop.viewType === "home-repartidor" ||
          prop.viewType === "perfil-repartidor" ? (
            <div className={`${s.statusContainer}`}>
              {prop.status === "pendiente" ? (
                <StatusPending />
              ) : prop.status === "en-curso" ? (
                <StatusInProgress />
              ) : (
                <StatusDelivered />
              )}
              <p className={`${s.statusText}`}>
                {prop.status === "pendiente"
                  ? "PENDIENTE"
                  : prop.status === "en-curso"
                  ? "EN CURSO"
                  : "ENTREGADO"}
              </p>
            </div>
          ) : null}
          {(prop.viewType === "home-repartidor" &&
            prop.section === "repartos-pendientes" &&
            prop.status === "en-curso") ||
          prop.viewType === "paquetes-admin" ||
          prop.viewType === "perfil-repartidor" ? (
            <div className={`${s.div3Aling}`}>
              <Trash />
            </div>
          ) : null}
          {prop.viewType === "home-repartidor" &&
          prop.section === "repartos-pendientes" &&
          prop.status === "pendiente" ? (
            <button className={`${s.button}`}>Iniciar</button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TableListPackages;
