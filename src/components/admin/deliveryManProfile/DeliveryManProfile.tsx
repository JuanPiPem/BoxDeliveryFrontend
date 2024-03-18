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
    id: string;
    address: string;
    status: string;
    // onStartPackage: fn
  }

  const arrayFakeData: FakeData[] = [
    {
      id: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      status: "entregado",
    },
    {
      id: "#0A903",
      address: "Las Heras 5678",
      status: "entregado",
    },
    {
      id: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      status: "entregado",
    },
    {
      id: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      status: "entregado",
    },
    {
      id: "#0A903",
      address: "Las Heras 5678",
      status: "entregado",
    },
    {
      id: "#0A903",
      address: "Las Heras 5678",
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
                arrayPackages={arrayFakeData}
                view="perfil-repartidor"
                section="repartos-pendientes"
                onStartPackage={() => {}}
              />
              <DeliveriesHistory
                arrayPackages={arrayFakeData}
                view="perfil-repartidor"
                section="historial-repartos"
                onStartPackage={() => {}}
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
