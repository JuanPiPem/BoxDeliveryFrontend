"use client";
import React, { useEffect, useState } from "react";
import s from "./deliveryInProgress.module.scss";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Map from "../map/Map";
import { useParams, useRouter } from "next/navigation";
import {
  packageServiceCancelTrip,
  packageServiceFinishTrip,
  packageServiceGetSingleById,
  packageServiceStartTrip,
} from "services/package.service";
import { Toaster, toast } from "sonner";

const DeliveryInProgress = () => {
  const router = useRouter();
  const params = useParams();
  const [singlePackage, setSinglePackage] = useState(Object);
  const [status, setStatus] = useState("");

  useEffect(() => {
    packageServiceGetSingleById(params.id.toString()).then((singlePackage) =>
      setSinglePackage(singlePackage)
    );
  }, [params]);

  useEffect(() => {
    singlePackage.status === `pending` &&
      singlePackage.user_id === null &&
      setStatus("pending unassigned");

    singlePackage.status === `pending` &&
      singlePackage.user_id !== null &&
      setStatus("pending assigned");

    singlePackage.status === `ongoing` && setStatus("ongoing");

    singlePackage.status === `delivered` && setStatus("delivered");
  }, [singlePackage.status, singlePackage.user_id]);

  const handleClick = async () => {
    if (status === `pending unassigned`) return router.back();
    if (status === `pending assigned`) {
      await packageServiceStartTrip(params.id.toString());
      try {
        return toast.success("Comenzo el reparto", {
          description: "Presta atencion al camino!",
        });
      } catch (error) {
        return toast.error("No se pudo iniciar el reparto", {
          description: "Refresque e intente nuevamente!",
        });
      }
    }
    if (status === `ongoing`) {
      await packageServiceFinishTrip(params.id.toString());
      try {
        toast.success("Finalizaste el viaje exitosamente", {
          description: "Al siguiente paquete -->",
        });
        return setTimeout(() => {
          router.push("/delivery-man/start-work-day");
        }, 1200);
      } catch (error) {
        return toast.error("No se pudo finalizar el viaje", {
          description: "Refresque e intente nuevamente!",
        });
      }
    }
    if (status === `delivered`)
      return router.push("/delivery-man/start-work-day");
  };

  const handleCancelClick = async () => {
    await packageServiceCancelTrip(singlePackage.id);
    try {
      return router.push("/delivery-man/start-work-day");
    } catch (error) {
      return toast.error(`${error}`);
    }
  };
  const packageStatus = () => {
    if (status === "pending unassigned" || status === "pending assigned") {
      return "pendiente";
    } else if (status === "ongoing") {
      return "en curso";
    } else if (status === "delivered") {
      return "entregado";
    } else {
      return "pendiente";
    }
  };
  return (
    <>
      <div className={s.inProgressConteiner}>
        <Header text={`reparto ${packageStatus()}`} />
        <div className={s.inProgressMap}>
          <div className={s.map}>
            <Map />
          </div>
          <div className={s.deliveryDataContainer}>
            <div className={s.deliveryData}>
              <span className={s.bold}>Destino: </span>
              {singlePackage.address} <br />
              <span className={s.bold}> Número de paquete: </span> #
              {singlePackage.id} <br />
              <span className={s.bold}> Recibe: </span>
              {singlePackage.receiver_name}
            </div>
          </div>
        </div>

        <div className={s.inProgressBtn}>
          <div className="darkblue" onClick={handleClick}>
            <ButtonDarkBlue
              text={
                status === "pending unassigned"
                  ? "volver"
                  : status === "pending assigned"
                  ? "comenzar"
                  : status === "ongoing"
                  ? "finalizar"
                  : status === "delivered"
                  ? "volver"
                  : "volver"
              }
            />
          </div>
          <button
            className={s.btnCancelDelivery}
            onClick={handleCancelClick}
            style={{
              display: status === `ongoing` ? "block" : "none",
            }}
          >
            cancelar entrega
          </button>
        </div>
        <Toaster richColors position="top-center" expand={true} />
      </div>
    </>
  );
};

export default DeliveryInProgress;
