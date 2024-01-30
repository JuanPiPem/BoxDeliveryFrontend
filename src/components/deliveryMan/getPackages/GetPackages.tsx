"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "./getPackages.module.scss";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import VectorDown from "assets/img/VectorDown";
import VectorUp from "assets/img/VectorUp";
import SelectPackage from "commons/selectPackage/SelectPackage";
import Link from "next/link";

const GetPackages = () => {
  interface FakeData {
    address: string;
    checked: boolean;
  }

  const arrayFakeData: FakeData[] = [
    {
      address: "Av. Carabobo y Rivadavia, CABA",
      checked: true,
    },
    {
      address: "Castillo 670, CABA",
      checked: true,
    },
    {
      address: "Melian 1242, CABA",
      checked: true,
    },
    {
      address: "Av. Carabobo y Rivadavia",
      checked: false,
    },
    {
      address: "Av. Colón",
      checked: false,
    },
    {
      address: "Av. Canadá",
      checked: false,
    },
    {
      address: "Mar del Plata",
      checked: false,
    },
    {
      address: "Rio Negro",
      checked: false,
    },
    {
      address: "Av. Carabobo y Rivadavia",
      checked: false,
    },
    {
      address: "Cabimas 2425, Bs Aires",
      checked: false,
    },
  ];

  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const packagesListRef = useRef<HTMLDivElement>(null);

  const handleVectorContainerClick = () => {
    if (packagesListRef.current) {
      console.log("acacacacac");
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
          <Header text="Obtener Paquetes" />
        </div>

        <div className={`${s.headList}`}>
          <div>¿Cuantos paquetes repartiras hoy?</div>
        </div>

        <div
          className={`${s.packagesList} ${isScrollable ? s.scrolled : ""}`}
          ref={packagesListRef}
        >
          {arrayFakeData.map((item, index) => (
            <>
              <div key={index}>
                <Link href={"/delivery-man/delivery-in-progress"}>
                  <SelectPackage
                    address={item.address}
                    checked={item.checked}
                  />
                </Link>
              </div>
              {index < arrayFakeData.length - 1 && <hr className={s.lastHr} />}
            </>
          ))}
        </div>
        {arrayFakeData.length > 8 ? (
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
          <Link href={"/delivery-man/start-work-day"}>
            <ButtonDarkBlue text="Iniciar Jornada" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetPackages;
