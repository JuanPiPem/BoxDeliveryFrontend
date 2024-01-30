"use client";

import React, { useRef, useEffect, useState, MouseEvent } from "react";
import s from "./startWorkDay.module.scss";
import { Saira } from "next/font/google";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import DeliveriesHistory from "commons/deliveriesHistory/DeliveriesHistory";
import PendingDeliveries from "commons/pendingDeliveries/PendingDeliveries";

const saira = Saira({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const StartWorkDay = () => {
  interface FakeData {
    packageNumber: string;
    address: string;
    city: string;
    status: string;
  }

  const arrayFakeDataPendingPackages: FakeData[] = [
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "en-curso",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "pendiente",
    },
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "en-curso",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "pendiente",
    },
  ];

  const arrayFakeData: FakeData[] = [
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "entregado",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "entregado",
    },
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "entregado",
    },
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "entregado",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "entregado",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "entregado",
    },
  ];

  return (
    <>
      <div className={s.packagesContainer}>
        <div className={s.packagesContentContainer}>
          <PendingDeliveries arrayPackages={arrayFakeDataPendingPackages} />
          <DeliveriesHistory arrayPackages={arrayFakeData} />
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
