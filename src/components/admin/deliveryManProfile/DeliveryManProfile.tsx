"use client";

import React from "react";
import s from "./deliveryManProfile.module.scss";
import Header from "commons/header/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import PendingDeliveries from "commons/pendingDeliveries/PendingDeliveries";
import DeliveriesHistory from "commons/deliveriesHistory/DeliveriesHistory";

const DeliveryManProfile = () => {
  interface FakeData {
    packageNumber: string;
    address: string;
    city: string;
    status: string;
  }

  const arrayFakeDataPendingPackages: FakeData[] = [
    /*     {
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
    }, */
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
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Gestionar Pedidos" />
        </div>
        <div className={s.welcomeCardContainer}>
          <div className={s.welcomeCard}>
            <div className={s.deliveryManData}>
              <div className={s.profileImage}></div>
              <div className={s.textContainer}>
                <h5>Farid</h5>
                <p>Habilitado</p>
              </div>
            </div>
            <div>
              <ChakraProvider>
                <Switch colorScheme="teal" size="md" isChecked />
              </ChakraProvider>
            </div>
          </div>
        </div>

        <>
          <div className={s.addPackagesContainer}>
            <div className={s.addPackagesContentContainer}>
              <PendingDeliveries
                arrayPackages={arrayFakeDataPendingPackages}
                view="perfil-repartidor"
                section="repartos-pendientes"
              />
              <DeliveriesHistory
                arrayPackages={arrayFakeData}
                view="perfil-repartidor"
                section="historial-repartos"
              />
              <hr className={s.packages} />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default DeliveryManProfile;
