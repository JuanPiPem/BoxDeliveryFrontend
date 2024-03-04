"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "./deliveryMen.module.scss";
import Header from "commons/header/Header";
import ColorPoint from "assets/img/ColorPoint";
import PercentageGraph from "assets/img/PercentageGraph";
import VectorDown from "assets/img/VectorDown";
import Link from "next/link";
import VectorUp from "assets/img/VectorUp";

const DeliveryMen = () => {
  interface FakeData {
    name: string;
    state: string;
    level: number;
  }

  const arrayFakeData: FakeData[] = [
    { name: "Farid", state: "en curso", level: 52 },
    { name: "Luciana", state: "entregado", level: 100 },
    { name: "Dario", state: "en curso", level: 80 },
    { name: "Santiago", state: "deshabilitado", level: 0 },
    { name: "Santiago", state: "deshabilitado", level: 0 },
  ];

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
          {arrayFakeData.map((objeto) => (
            <>
              <Link href={"/admin/delivery-man-profile"}>
                <div className={s.contentUser} key={objeto.level + 1}>
                  <div className={s.percentage}>
                    <PercentageGraph level={objeto.level} />
                  </div>

                  <div className={s.nameAndState}>
                    <div id={s.objetoName}>{objeto.name}</div>
                    <div className={s.ProfileState}>
                      {" "}
                      <ColorPoint state={objeto.state} /> {objeto.state}
                    </div>
                  </div>
                  <div className={s.profilePicture}></div>
                </div>
              </Link>
            </>
          ))}
        </div>
        {arrayFakeData.length > 4 ? (
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
