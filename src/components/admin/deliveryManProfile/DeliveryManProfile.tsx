"use client";

import React, { useEffect, useState } from "react";
import s from "./deliveryManProfile.module.scss";
import Header from "commons/header/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import PendingDeliveries from "commons/pendingDeliveries/PendingDeliveries";
import DeliveriesHistory from "commons/deliveriesHistory/DeliveriesHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import { packageServiceGetPackagesByUserIdAndStatus } from "services/package.service";
import {
  userServiceDisabledDeliveryman,
  userServiceEnabledDeliveryman,
  userServiceMe,
} from "services/user.service";
import { setUser } from "state/user";

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
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  console.log(user.is_enabled);
  const toggleEnabled = async () => {
    if (user.id !== null) {
      if (user.is_enabled) {
        await userServiceDisabledDeliveryman(user.id);
        try {
          const user = userServiceMe();
          try {
            dispatch(setUser(user));
          } catch (error) {
            return;
          }
        } catch (error) {
          return;
        }
      } else {
        return await userServiceEnabledDeliveryman(user.id || 4);
      }
    } else {
      console.error("User ID is null");
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
                <p>{user.is_enabled ? "Habilitado" : "No Habilitado"}</p>
              </div>
            </div>
            <div>
              <ChakraProvider>
                <Switch
                  colorScheme="teal"
                  size="md"
                  isChecked={user.is_enabled}
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
