"use client";

import React, { useRef, useEffect, useState } from "react";
import s from "./pendingDeliveries.module.scss";
import { Saira } from "next/font/google";
import TableListPackages from "commons/tableListPackages/TableListPackages";
import VectorDown from "assets/img/VectorDown";
import VectorUp from "assets/img/VectorUp";
import DeployArrowDown from "assets/img/DeployArrowDown";
import DeployArrowRight from "assets/img/DeployArrowRight";

const saira = Saira({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type Prop = {
  arrayPackages: Array<any>;
};

function PendingDeliveries(prop: Prop) {
  const [show, setShow] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  const packagesListRef = useRef<HTMLDivElement>(null);

  const handleVectorContainerClick = () => {
    if (packagesListRef.current) {
      packagesListRef.current.scrollTop += 50;

      const scrollBottom =
        packagesListRef.current.scrollHeight -
        (packagesListRef.current.scrollTop +
          packagesListRef.current.clientHeight);

      // Verifica si el scroll está cerca del final (ajustar el margen según sea necesario)
      const atBottom = scrollBottom <= 1;

      setAtBottom(atBottom);
    }
  };

  const handleVectorUpClick = () => {
    if (atBottom && packagesListRef.current) {
      packagesListRef.current.scrollTop = 0;
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
  }, [isScrollable, show, atBottom]);

  return (
    <>
      <div
        className={s.divDelivery}
        onClick={toggle}
        style={{ marginTop: "10px" }}
      >
        <div className={s.divDeliveryTexts}>
          <p className={`${s.textDelivery} ${saira.className}`}>
            REPARTOS PENDIENTES
          </p>
          {!prop.arrayPackages.length ? (
            <p className={`${s.textDeliveryNotFound} ${saira.className}`}>
              sin repartos
            </p>
          ) : null}
        </div>
        <div className={s.arrow}>
          {show ? <DeployArrowDown /> : <DeployArrowRight />}
        </div>
      </div>
      {show && prop.arrayPackages.length ? (
        <>
          <div className={s.backgronudPaddingTop}></div>
          <div
            id="start"
            className={`${s.packagesList} ${isScrollable ? s.scrolled : ""}`}
            ref={packagesListRef}
          >
            <div>
              {prop.arrayPackages.map((item, index) => (
                <div key={item.packageNumber}>
                  <div className={s.boxTrash}>
                    <TableListPackages
                      packageNumber={item.packageNumber}
                      address={item.address}
                      city={item.city}
                      viewType="home-repartidor"
                      section="repartos-pendientes"
                      status={item.status}
                    />
                  </div>
                  {index < prop.arrayPackages.length - 1 && (
                    <hr className={s.hr} />
                  )}
                </div>
              ))}
            </div>
          </div>
          {prop.arrayPackages.length > 3 ? (
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
        </>
      ) : null}
    </>
  );
}

export default PendingDeliveries;
