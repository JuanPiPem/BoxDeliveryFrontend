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

interface ApiError {
  response: {
    data: string;
  };
}

const GetPackages = () => {
  const router = useRouter();
  const [packages, setPackages] = useState<item[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const checkedPackageIds = localStorage.getItem("selectedIds");
      if (!user.id) throw new Error();
      if (!checkedPackageIds) return console.log("no habia nada");
      const ids: string[] = JSON.parse(checkedPackageIds);
      try {
        const idsCopy = [...ids];
        for (const packageId of idsCopy) {
          const index = ids.indexOf(packageId);
          if (index !== -1) {
            ids.splice(index, 1);
            localStorage.setItem("selectedIds", JSON.stringify(ids));
          }
        }
        router.push("/delivery-man/sworn-declaration");
      } catch (error) {
        const err =
          (error as ApiError).response.data ===
          "Error: You can't deliver more than 10 packages per day"
            ? "Limite maximo de 10 paquetes por dia"
            : (error as ApiError).response;
        toast.error("Error con la asignacion de paquetes", {
          description: `${err}`,
        });
      }
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

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
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
          {packages.map((item: item, index: number) => (
            <React.Fragment key={item.id}>
              <SelectPackage package={item} />
              {index < packages?.length - 1 && <hr className={s.lastHr} />}
            </React.Fragment>
          ))}
        </div>
        {packages.length > 8 && (
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
        )}
        <div className={`${s.button}`} onClick={handleSubmit}>
          <ButtonDarkBlue text="Iniciar Jornada" />
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default GetPackages;
