"use client";

import React, { useState } from "react";
import s from "./startWorkDay.module.scss";
import { Saira } from "next/font/google";
import Header from "commons/header/Header";
import TableListPackages from "commons/tableListPackages/TableListPackages";
import Vector from "assets/img/Vector";
import DeployArrowDown from "assets/img/DeployArrowDown";
import DeployArrowRight from "assets/img/DeployArrowRight";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";

const saira = Saira({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const deliveryHistory = true;
const deliveryPending = true;

const StartWorkDay = () => {
  const [showHistory, setShowHistory] = useState(true);
  const [showPending, setShowPending] = useState(true);

  const toggleHistory = () => {
    setShowHistory((prevState) => !prevState);
  };

  const toggleDeliveryPending = () => {
    setShowPending((prevState) => !prevState);
  };

  return (
    <>
      <div className={s.addPackagesContainer}>
        <div className={s.addPackagesContentContainer}>
          <div className={`${s.divDelivery} ${s.pendingDeliveryMargin}`}>
            <div className={s.divDeliveryTexts}>
              <p className={`${s.textDelivery} ${saira.className}`}>
                REPARTOS PENDIENTES
              </p>
              {!deliveryPending ? (
                <p className={`${s.textDeliveryNotFound} ${saira.className}`}>
                  sin repartos
                </p>
              ) : null}
            </div>
            <div className={s.arrowDown} onClick={toggleDeliveryPending}>
              {showPending ? <DeployArrowDown /> : <DeployArrowRight />}
            </div>
          </div>
          {showPending ? (
            <div className={s.packagesList}>
              <div className={s.boxTrash}>
                <TableListPackages
                  viewType="home-repartidor"
                  section="repartos-pendientes"
                  status="en-curso"
                />
              </div>
              <hr className={s.hr} />
              <div className={s.boxTrash}>
                <TableListPackages
                  viewType="home-repartidor"
                  section="repartos-pendientes"
                  status="pendiente"
                />
              </div>
              <hr className={s.lastHr} />
              <div className={s.vector}>
                <Vector />
              </div>
            </div>
          ) : null}

          <div className={s.divDelivery} style={{ marginTop: "10px" }}>
            <div className={s.divDeliveryTexts}>
              <p className={`${s.textDelivery} ${saira.className}`}>
                HISTORIAL DE REPARTOS
              </p>
              {!deliveryHistory ? (
                <p className={`${s.textDeliveryNotFound} ${saira.className}`}>
                  sin historial
                </p>
              ) : null}
            </div>
            <div className={s.arrowDown} onClick={toggleHistory}>
              {showHistory ? <DeployArrowDown /> : <DeployArrowRight />}
            </div>
          </div>
          {showHistory ? (
            <div className={s.packagesList}>
              <div className={s.packagesNumber}>58 paquetes entregados</div>
              <hr className={s.hr} />
              <div className={s.boxTrash}>
                <TableListPackages
                  viewType="home-repartidor"
                  section=""
                  status="entregado"
                />
              </div>
              <hr className={s.hr} />
              <div className={s.boxTrash}>
                <TableListPackages
                  viewType="home-repartidor"
                  section=""
                  status="entregado"
                />
              </div>
              <hr className={s.hr} />
              <div className={s.boxTrash}>
                <TableListPackages
                  viewType="home-repartidor"
                  section=""
                  status="entregado"
                />
              </div>
              <hr className={s.lastHr} />
              <div className={s.vector}>
                <Vector />
              </div>
            </div>
          ) : null}
          {/*           Corregir el botón para que siempre que pegado al final de la 
          página a 10px de separación */}
          <div className={s.buttonGetPackages}>
            <ButtonDarkBlue text="Obtener Paquetes" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StartWorkDay;
