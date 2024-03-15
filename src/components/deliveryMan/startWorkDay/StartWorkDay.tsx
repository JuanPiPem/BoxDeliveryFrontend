"use client";

import React, { useEffect, useState } from "react";
import s from "./startWorkDay.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import DeliveriesHistory from "commons/deliveriesHistory/DeliveriesHistory";
import PendingDeliveries from "commons/pendingDeliveries/PendingDeliveries";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { packageServiceGetPackagesByUserIdAndStatus } from "services/package.service";

const StartWorkDay = () => {
  const [pendingPackages, setPendingPackages] = useState([]);
  const [ongoingPackages, setOngoingPackages] = useState([]);
  const [deliveredPackages, setDeliverdPackages] = useState([]);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchPendingPackages = async () => {
      try {
        if (user.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            user.id,
            "pending"
          );
          setPendingPackages(response);
        } else {
          console.error("User ID is null");
        }
      } catch (error) {
        console.error("Error fetching pending packages:", error);
      }
    };

    fetchPendingPackages();
  }, [user]);

  useEffect(() => {
    const fetchDeliveredPackages = async () => {
      try {
        if (user.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            user.id,
            "delivered"
          );
          setDeliverdPackages(response);
        } else {
          console.error("User ID is null");
        }
      } catch (error) {
        console.error("Error fetching delivered packages:", error);
      }
    };
    fetchDeliveredPackages();
  }, [user]);

  useEffect(() => {
    const fetchOngoingPackages = async () => {
      try {
        if (user.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            user.id,
            "ongoing"
          );
          setOngoingPackages(response);
        } else {
          console.error("User ID is null");
        }
      } catch (error) {
        console.error("Error fetching ongoing packages:", error);
      }
    };

    fetchOngoingPackages();
  }, [user]);

  const combinedPackages = [...pendingPackages, ...ongoingPackages];

  return (
    <div className={s.packagesContainer}>
      <div className={s.packagesContentContainer}>
        <PendingDeliveries
          arrayPackages={combinedPackages}
          view="home-repartidor"
          section="repartos-pendientes"
        />
        <DeliveriesHistory
          arrayPackages={deliveredPackages}
          view="home-repartidor"
          section="historial-repartos"
        />
        {/*           Corregir el botón para que siempre que pegado al final de la 
          página a 10px de separación */}
        <Link href={"/delivery-man/get-packages"}>
          <div className={s.buttonGetPackages}>
            <ButtonDarkBlue text="Obtener Paquetes" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StartWorkDay;
