"use client";
import React, { useEffect, useState } from "react";
import s from "./deliveryInProgress.module.scss";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Map from "../map/Map";
import { useParams, useRouter } from "next/navigation";
import {
  packageServiceAssignPackage,
  packageServiceCancelTrip,
  packageServiceFinishTrip,
  packageServiceGetSingleById,
  packageServiceRemoveAssignPackage,
  packageServiceStartTrip,
} from "services/package.service";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
const DeliveryInProgress = () => {
  const router = useRouter();
  const params = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [singlePackage, setSinglePackage] = useState(Object);

  useEffect(() => {
    packageServiceGetSingleById(params.id.toString()).then((singlePackage) =>
      setSinglePackage(singlePackage)
    );
  }, [params]);

  const handleClick = async () => {
    if (singlePackage.status === `pending`) {
      if (singlePackage.user_id !== user.id) {
        return toast.warning("Primero debes asignarte este paquete");
      }
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
    if (singlePackage.status === "ongoing") {
      await packageServiceFinishTrip(params.id.toString());
      try {
        return toast.success("Finalizaste el viaje exitosamente", {
          description: "Al siguiente paquete -->",
        });
      } catch (error) {
        return toast.error("No se pudo finalizar el viaje", {
          description: "Refresque e intente nuevamente!",
        });
      }
    }
    if (singlePackage.status === "delivered")
      return router.push("/delivery-man/start-work-day");
    singlePackage.status === `pending`
      ? `comenzar`
      : singlePackage.status === `ongoing`
      ? `finalizar`
      : "ni idea";
  };

  const handleCancelClick = async () => {
    if (
      singlePackage.user_id === user.id &&
      singlePackage.status === "pending"
    ) {
      await packageServiceRemoveAssignPackage(params.id.toString());
      try {
        return toast.success("Liberaste el paquete");
      } catch (error) {
        return toast.error("Error");
      }
    }
    if (
      singlePackage.user_id === user.id &&
      singlePackage.status === "ongoing"
    ) {
      await packageServiceCancelTrip(params.id.toString());
      try {
        return toast.success("Reparto cancelado");
      } catch (error) {
        return toast.error("Error");
      }
    }
    if (singlePackage.user_id === null) {
      await packageServiceAssignPackage(params.id.toString(), user.id);
      try {
        return toast.success("Se te ha asignado el paquete");
      } catch (error) {
        return toast.error("Error");
      }
    }
  };
  return (
    <>
      <div className={s.inProgressConteiner}>
        <Header text="reparto en curso" />
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
                singlePackage.status === `ongoing`
                  ? `finalizar`
                  : singlePackage.status === `pending`
                  ? `comenzar`
                  : "Home"
              }
            />
          </div>
          <button className={s.btnCancelDelivery} onClick={handleCancelClick}>
            {singlePackage.user_id === user.id &&
            singlePackage.status === "pending"
              ? "Liberar paquete a otro repartidor"
              : singlePackage.user_id === user.id &&
                singlePackage.status === "ongoing"
              ? "cancelar entrega"
              : singlePackage.user_id === null
              ? "asignarme paquete"
              : "reportar problema"}
          </button>
        </div>
        <Toaster richColors position="top-center" expand={true} />
      </div>
    </>
  );
};

export default DeliveryInProgress;
