"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "./getPackages.module.scss";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import VectorDown from "assets/img/VectorDown";
import VectorUp from "assets/img/VectorUp";
import SelectPackage from "commons/selectPackage/SelectPackage";
import { packageServiceGetUnassigned } from "services/package.service";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

type item = {
  id: string;
  receiver_name: string;
  address: string;
  status: string;
  date: string;
  weight: number;
  user_id: number;
  checked: boolean;
};

const GetPackages = () => {
  const router = useRouter();
  const [packages, setPackages] = useState(Object);
  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const packagesListRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);

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
      packagesListRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
      setAtBottom(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.id) throw new Error();
    try {
      router.push("/delivery-man/sworn-declaration");
    } catch (error) {
      return toast.error("Hubo un problema con la asignacion de paquetes", {
        description: "Refresque la pagina e intente nuevamente",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (packagesListRef.current) {
        const scrolled =
          packagesListRef.current.scrollHeight >
          packagesListRef.current.clientHeight;
        setIsScrollable(scrolled);
        const atBottom =
          packagesListRef.current.scrollTop +
            packagesListRef.current.clientHeight >=
          packagesListRef.current.scrollHeight - 1;
        setAtBottom(atBottom);
      }
    };

    const currentRef = packagesListRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {};
  }, [isScrollable, atBottom]);

  useEffect(() => {
    packageServiceGetUnassigned()
      .then((unassignedPackages) => setPackages(unassignedPackages))
      .catch((err) => console.error(err));
  }, []);

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
          {packages[0] &&
            packages.map((item: item, index: number) => (
              <>
                <div key={item.id}>
                  <SelectPackage package={item} />
                </div>
                {index < packages?.length - 1 && <hr className={s.lastHr} />}
              </>
            ))}
        </div>
        {packages?.length > 8 ? (
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
        <div className={`${s.button}`} onClick={handleSubmit}>
          <ButtonDarkBlue text="Iniciar Jornada" />
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default GetPackages;
