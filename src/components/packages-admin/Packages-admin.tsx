import React from "react";
import s from "./packages-admin.module.scss";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";

const getFormattedDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  return { month, day };
};

const Packages = () => {
  const { month, day } = getFormattedDate();

  return (
    <div className={s.addPackagesContainer}>
      <div className={s.navBar}>
        <Navbar />
      </div>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Paquetes" />
        </div>
        <div className={s.packagesList}>
          <div className={s.dateContainer}>
            <span>{month}</span>
            <span>{`mie/${day}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
