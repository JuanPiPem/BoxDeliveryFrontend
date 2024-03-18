"use client";

import React, { useEffect, useState } from "react";
import s from "./startWorkDay.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import DeliveriesHistory from "commons/deliveriesHistory/DeliveriesHistory";
import PendingDeliveries from "commons/pendingDeliveries/PendingDeliveries";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import {
  packageServiceGetPackagesByUserIdAndStatus,
  packageServiceStartTrip,
} from "services/package.service";

type PendingPackage = {
  id: string;
  receiver_name: string;
  date: string;
  weight: number;
  address: string;
  status: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
};

const StartWorkDay = () => {
  const [pendingPackages, setPendingPackages] = useState<PendingPackage[]>([]);
  const [ongoingPackages, setOngoingPackages] = useState<PendingPackage[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<PendingPackage[]>(
    []
  );
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchPendingPackages = async () => {
      try {
        if (user.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            user.id,
            "pending"
          );
          console.log("Pending packages:", response);
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
          setDeliveredPackages(response);
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

  const handleStartPackage = async (packageId: string) => {
    try {
      console.log(`Intentando iniciar el paquete con ID ${packageId}`);
      // Llama a la función de servicio para cambiar el estado del paquete a "ongoing"
      await packageServiceStartTrip(packageId);

      // Actualiza el estado de los paquetes pendientes y en curso
      const updatedPendingPackages = pendingPackages.filter(
        (packageItem) => packageItem.id !== packageId
      );
      const updatedPackage = pendingPackages.find(
        (packageItem) => packageItem.id === packageId
      );

      // Verifica si updatedPackage no es undefined antes de usarlo
      if (updatedPackage) {
        setPendingPackages(updatedPendingPackages);
        setOngoingPackages([...ongoingPackages, updatedPackage]);
        console.log(
          `El paquete con ID ${packageId} ha cambiado a estado "ongoing"`
        );
      } else {
        console.error("Updated package is undefined");
      }
    } catch (error) {
      console.error("Error updating package status:", error);
    }
  };

  return (
    <div className={s.packagesContainer}>
      <div className={s.packagesContentContainer}>
        <PendingDeliveries
          arrayPackages={combinedPackages}
          view="home-repartidor"
          section="repartos-pendientes"
          onStartPackage={handleStartPackage}
        />
        <DeliveriesHistory
          arrayPackages={deliveredPackages}
          view="home-repartidor"
          section="historial-repartos"
          onStartPackage={handleStartPackage}
        />
        {/* Corregir el botón para que siempre esté pegado al final de la página a 10px de separación */}
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
