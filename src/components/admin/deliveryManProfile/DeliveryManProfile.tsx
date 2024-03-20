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
  userServiceGetSingle,
} from "services/user.service";
import { useParams } from "next/navigation";
import { removeCurrentDeliveryMen, setCurrentDeliveryMen } from "state/user";

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
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  const dispatch = useDispatch();
  const [pendingPackages, setPendingPackages] = useState<PendingPackage[]>([]);
  const [ongoingPackages, setOngoingPackages] = useState<PendingPackage[]>([]);
  const [deliveredPackages, setDeliveredPackages] = useState<PendingPackage[]>(
    []
  );
  const currentDeliveryMen = useSelector(
    (state: RootState) => state.currentDeliveryMen
  );

  useEffect(() => {
    const fetchDeliveryMan = async () => {
      const deliveryMan = await userServiceGetSingle(id);
      try {
        dispatch(removeCurrentDeliveryMen());
        dispatch(setCurrentDeliveryMen(deliveryMan));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDeliveryMan();
  }, [params, currentDeliveryMen.is_enabled, dispatch, id]);

  const toggleEnabled = async () => {
    if (currentDeliveryMen !== undefined && currentDeliveryMen.id !== null) {
      if (currentDeliveryMen.is_enabled) {
        const response = await userServiceDisabledDeliveryman(
          currentDeliveryMen.id
        );
        dispatch(setCurrentDeliveryMen(response));
      } else if (!currentDeliveryMen.is_enabled) {
        const response = await userServiceEnabledDeliveryman(
          currentDeliveryMen.id
        );
        dispatch(setCurrentDeliveryMen(response));
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchPendingPackages = async () => {
      try {
        if (currentDeliveryMen.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            currentDeliveryMen.id,
            "pending"
          );

          setPendingPackages(response);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching pending packages:", error);
      }
    };

    fetchPendingPackages();
  }, [currentDeliveryMen]);

  useEffect(() => {
    const fetchDeliveredPackages = async () => {
      try {
        if (currentDeliveryMen.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            currentDeliveryMen.id,
            "delivered"
          );
          setDeliveredPackages(response);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching delivered packages:", error);
      }
    };
    fetchDeliveredPackages();
  }, [currentDeliveryMen]);

  useEffect(() => {
    const fetchOngoingPackages = async () => {
      try {
        if (currentDeliveryMen.id !== null) {
          const response = await packageServiceGetPackagesByUserIdAndStatus(
            currentDeliveryMen.id,
            "ongoing"
          );
          setOngoingPackages(response);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching ongoing packages:", error);
      }
    };

    fetchOngoingPackages();
  }, [currentDeliveryMen]);

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
              <div className={s.profileImage}></div>
              <div className={s.textContainer}>
                <h5>{currentDeliveryMen.name}</h5>
                <p>
                  {currentDeliveryMen.is_enabled
                    ? "Habilitado"
                    : "deshabilitado"}
                </p>
              </div>
            </div>
            <div>
              <ChakraProvider>
                <Switch
                  colorScheme="teal"
                  size="md"
                  isChecked={currentDeliveryMen.is_enabled}
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
