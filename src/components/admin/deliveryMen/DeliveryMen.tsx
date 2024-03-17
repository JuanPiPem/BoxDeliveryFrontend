"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./deliveryMen.module.scss";
import Header from "commons/header/Header";
import ColorPoint from "assets/img/ColorPoint";
import VectorDown from "assets/img/VectorDown";
import Link from "next/link";
import VectorUp from "assets/img/VectorUp";
import PieChart from "commons/pieChart/PieChart";
import { userServiceGetDeliverymenWithPackagesQuantityByDate } from "services/user.service";

const DeliveryMen = () => {
  type deliveryman = {
    id: number;
    email: string;
    name: string;
    last_name: string;
    profile_photo: string;
    is_admin: boolean;
    is_confirmed: boolean;
    is_enabled: boolean;
    packagesQuantity: number;
    packagesDeliveredQuantity: number;
  };

  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [deliverymen, setDeliverymen] = useState<deliveryman[]>([]);
  const packagesListRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date();
  const dayNumber = currentDate.getDate(); // Obtener el día
  const monthNumber = currentDate.getMonth() + 1; // Obtener el mes (los meses en JavaScript son indexados desde 0)
  const monthNumberFormartted = monthNumber.toString().padStart(2, "0");
  const year = currentDate.getFullYear();

  const handleVectorContainerClick = () => {
    if (packagesListRef.current) {
      const currentScrollTop = packagesListRef.current.scrollTop;
      packagesListRef.current.scrollTop = currentScrollTop + 50;

      const atBottom =
        packagesListRef.current.scrollTop +
          packagesListRef.current.clientHeight >=
        packagesListRef.current.scrollHeight - 10;

      setAtBottom(atBottom);
    }
  };

  const handleVectorUpClick = () => {
    if (packagesListRef.current) {
      // Utiliza scrollTo para llevar al inicio del scroll
      packagesListRef.current.scrollTo({
        top: 0,
        behavior: "auto", // Cambiado a "auto" para un desplazamiento instantáneo
      });

      setAtBottom(false);
    }
  };

  useEffect(() => {
    userServiceGetDeliverymenWithPackagesQuantityByDate(
      year + "-" + monthNumberFormartted + "-" + dayNumber
    ).then((deliverymen) => {
      setDeliverymen(deliverymen);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (packagesListRef.current) {
        const scrolled =
          packagesListRef.current.scrollHeight >
          packagesListRef.current.clientHeight;
        setIsScrollable(scrolled);

        // Verifica si el scroll está cerca del final
        const atBottom =
          packagesListRef.current.scrollTop +
            packagesListRef.current.clientHeight >=
          packagesListRef.current.scrollHeight - 1; // Cambiado a "-1" para que se considere inmediatamente al llegar al final

        setAtBottom(atBottom);
      }
    };
    const currentRef = packagesListRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {};
  }, [isScrollable, atBottom]);

  return (
    <>
      <div className={s.addPackagesContainer}>
        <div className={s.header}>
          <Header text="Repartidores" />
        </div>
        <div className={s.headList}>
          <div>
            <h1 className={s.month}>Enero </h1>
            <h1 className={s.day}> mie / 03</h1>
          </div>
        </div>
        <div
          className={`${s.packagesList} ${s.repartidores} ${
            isScrollable ? s.scrolled : ""
          }`}
          ref={packagesListRef}
        >
          {deliverymen &&
            deliverymen.map((deliveryman) => (
              <>
                <Link href={"/admin/delivery-man-profile"}>
                  <div className={s.contentUser} key={deliveryman.id}>
                    <div className={s.percentage}>
                      {deliveryman.is_enabled === true ? (
                        <PieChart
                          percent={Math.floor(
                            (deliveryman.packagesDeliveredQuantity /
                              deliveryman.packagesQuantity) *
                              100
                          )}
                        />
                      ) : (
                        <PieChart percent={0} />
                      )}
                    </div>
                    <div className={s.nameAndState}>
                      <div id={s.objetoName}>{deliveryman.name}</div>
                      <div className={s.ProfileState}>
                        {(deliveryman.packagesDeliveredQuantity /
                          deliveryman.packagesQuantity) *
                          100 ===
                        100 ? (
                          <ColorPoint state={"entregado"} />
                        ) : deliveryman.is_enabled === false ? (
                          <ColorPoint state={"deshabilitado"} />
                        ) : (
                          <ColorPoint state={"en curso"} />
                        )}
                        {(deliveryman.packagesDeliveredQuantity /
                          deliveryman.packagesQuantity) *
                          100 ===
                        100 ? (
                          <>{"Entregado"}</>
                        ) : deliveryman.is_enabled === false ? (
                          <>{"Deshabilitado"}</>
                        ) : (
                          <>{"En curso"}</>
                        )}
                      </div>
                    </div>
                    <div className={s.profilePicture}></div>
                  </div>
                </Link>
              </>
            ))}
        </div>
        {deliverymen.length > 4 ? (
          <div
            className={s.vectorContainer}
            onClick={
              atBottom ? handleVectorUpClick : handleVectorContainerClick
            }
          >
            <hr className={s.lastHr} />
            <div className={s.vector}>
              {atBottom ? <VectorUp /> : <VectorDown />}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DeliveryMen;
