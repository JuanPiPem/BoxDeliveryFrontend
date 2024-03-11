"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "./packages.module.scss";
import Header from "commons/header/Header";
import TableListPackages from "commons/tableListPackages/TableListPackages";
import VectorDown from "assets/img/VectorDown";
import VectorUp from "assets/img/VectorUp";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Link from "next/link";

const getFormattedDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate
    .toLocaleString("es-ES", {
      month: "long",
    })
    .toUpperCase();
  const dayOfWeek = currentDate
    .toLocaleString("es-ES", { weekday: "short" })
    .slice(0, 3);
  return { month, day, dayOfWeek };
};

const Packages = () => {
  interface FakeData {
    packageNumber: string;
    address: string;
    city: string;
    status: string;
  }

  const arrayFakeData: FakeData[] = [
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "",
    },
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "",
    },
    {
      packageNumber: "#0A903",
      address: "Las Heras 5678",
      city: "CABA",
      status: "",
    },
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "",
    },
    {
      packageNumber: "#0H167",
      address: "Av. Carabobo y Rivadavia",
      city: "CABA",
      status: "",
    },
  ];

  // const { month, day, dayOfWeek } = getFormattedDate();
  getFormattedDate();

  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const packagesListRef = useRef<HTMLDivElement>(null);

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
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Paquetes" />
        </div>
        <div className={s.headList}>
          <div>
            <h1 className={s.month}>Enero </h1>
            <h1 className={s.day}>
              {" "}
              mie <span className={s.bold}>/ 03</span>
            </h1>
          </div>
        </div>
        <div
          id="start"
          className={`${s.packagesList} ${isScrollable ? s.scrolled : ""}`}
          ref={packagesListRef}
        >
          <div>
            <div className={s.packagesNumber}>58 paquetes entregados</div>
            {arrayFakeData.map((item) => (
              <div key={item.packageNumber}>
                <hr className={s.hr} />
                <div className={s.boxTrash}>
                  <TableListPackages
                    packageNumber={item.packageNumber}
                    address={item.address}
                    city={item.city}
                    viewType="paquetes-admin"
                    section=""
                    status={item.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {arrayFakeData.length > 5 ? (
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
        <div className={`${s.button}`}>
          <Link href={"/admin/add-packages"}>
            <ButtonDarkBlue text="Nuevo paquete" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Packages;
