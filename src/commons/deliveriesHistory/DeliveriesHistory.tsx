"use client";

import React, { useRef, useEffect, useState } from "react";
import s from "./deliveriesHistory.module.scss";
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

interface FakeData {
  packageNumber: string;
  address: string;
  city: string;
  status: string;
}

type Prop = {
  arrayPackages: Array<FakeData>;
  view: string;
  section: string;
};

function DeliveriesHistory(prop: Prop) {
  const [show, setShow] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [showGradient, setShowGradient] = useState(true);

  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  const packagesListRef = useRef<HTMLDivElement>(null);

  const handleVectorContainerClick = () => {
    if (packagesListRef.current) {
      packagesListRef.current.scrollTop += 50;

      const scrollBottom = Math.round(
        packagesListRef.current.scrollHeight -
          (packagesListRef.current.scrollTop +
            packagesListRef.current.clientHeight)
      );

      const atBottom =
        scrollBottom <= 1 &&
        packagesListRef.current.scrollTop +
          packagesListRef.current.clientHeight >=
          packagesListRef.current.scrollHeight - 10;

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

        if (atBottom) {
          setShowGradient(false);
        } else {
          setShowGradient(true);
        }
      }
    };

    const currentRef = packagesListRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
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
            HISTORIAL DE REPARTOS
          </p>
          {!prop.arrayPackages.length ? (
            <p className={`${s.textDeliveryNotFound} ${saira.className}`}>
              sin historial
            </p>
          ) : null}
        </div>
        <div className={s.arrow}>
          {show && prop.arrayPackages.length ? (
            <DeployArrowDown />
          ) : (
            <DeployArrowRight />
          )}
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
              <div className={s.packagesNumber}>58 paquetes entregados</div>
              {prop.arrayPackages.map((item) => (
                <div key={item.packageNumber}>
                  <hr className={s.hr} />
                  <div className={s.boxTrash}>
                    <TableListPackages
                      packageNumber={item.packageNumber}
                      address={item.address}
                      city={item.city}
                      viewType={prop.view}
                      section={prop.section}
                      status={item.status}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.backgroundBorder}></div>
          {prop.arrayPackages.length > 3 && showGradient ? (
            <div className={s.gradient}></div>
          ) : (
            <div className={s.backgroundTransparent}></div>
          )}
          {prop.arrayPackages.length > 3 &&
          prop.view === "perfil-repartidor" ? (
            <>
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
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default DeliveriesHistory;
