import React from "react";
import s from "./manageOrders.module.scss";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";
import DeployArrowDown from "assets/img/DeployArrowDown";

const ManageOrders = () => {
  return (
    <div className={s.outerContainer}>
      <Navbar />
      <Header text="Gestionar pedidos" showArrow={false} />
      <div className={s.welcomeCardContainer}>
        <div className={s.welcomeCard}>
          <div className={s.profileImage} />
          <div className={s.textContainer}>
            <h5>¡Hola Admin!</h5>
            <p>Estos son los pedidos del día</p>
          </div>
        </div>
      </div>
      <div className={s.calendarCard}>
        <div className={s.header}>
          <h5>Enero</h5>
        </div>
        <div className={s.dates}></div>
      </div>
      <div className={s.detailsContainer}>
        <div className={s.header}>
          <h5>Detalles</h5>
          <div className={s.dateContainer}>
            <h6>03/01/23</h6>
            <DeployArrowDown />
          </div>
        </div>
        <div className={s.info}></div>
      </div>
    </div>
  );
};

export default ManageOrders;
