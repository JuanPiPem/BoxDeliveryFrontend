"use client";

import React, { useEffect, useState } from "react";
import s from "./deliveryManProfile.module.scss";
import Header from "commons/header/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import PendingDeliveries from "commons/pendingDeliveries/PendingDeliveries";
import DeliveriesHistory from "commons/deliveriesHistory/DeliveriesHistory";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { packageServiceGetPackagesByUserIdAndStatus } from "services/package.service";
import {
  userServiceDisabledDeliveryman,
  userServiceEnabledDeliveryman,
} from "services/user.service";

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

const DeliveryManProfile = () => {
  const [pendingPackages, setPendingPackages] = useState<PendingPackage[]>([]);
  const [ongoingPackages, setOngoingPackages] = useState<PendingPackage[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<PendingPackage[]>(
    []
  );
  const [isEnabled, setIsEnabled] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  const toggleEnabled = async () => {
    try {
      if (user.id !== null) {
        if (isEnabled) {
          // Si está habilitado, deshabilitarlo
          await userServiceDisabledDeliveryman(user.id);
        } else {
          // Si está deshabilitado, habilitarlo
          await userServiceEnabledDeliveryman(user.id);
        }
        // Actualizar el estado local de habilitación
        setIsEnabled(!isEnabled);
      } else {
        console.error("User ID is null");
      }
    } catch (error) {
      console.error("Error toggling deliveryman status:", error);
    }
  };

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

  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Gestionar Pedidos" />
        </div>
        <div className={s.welcomeCardContainer}>
          <div className={s.welcomeCard}>
            <div className={s.deliveryManData}>
              <div className={s.profileImage}>
                {/* <img src={user.profile_photo} alt="Profile" /> */}
              </div>
              <div className={s.textContainer}>
                <h5>{user.name}</h5>
                <p>{isEnabled ? "Habilitado" : "No Habilitado"}</p>
              </div>
            </div>
            <div>
              <ChakraProvider>
                <Switch
                  colorScheme="teal"
                  size="md"
                  isChecked={isEnabled}
                  onChange={toggleEnabled}
                />
              </ChakraProvider>
            </div>
          </div>
        </div>

        <>
          <div className={s.addPackagesContainer}>
            <div className={s.addPackagesContentContainer}>
              <PendingDeliveries
                arrayPackages={combinedPackages}
                view="perfil-repartidor"
                section="repartos-pendientes"
                onStartPackage={() => {}}
              />
              <DeliveriesHistory
                arrayPackages={deliveredPackages}
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
