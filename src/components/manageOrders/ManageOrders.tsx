import React from "react";
import s from "./manageOrders.module.scss";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";
import DeployArrowDown from "assets/img/DeployArrowDown";
import Plus from "assets/img/Plus";

const ManageOrders = () => {
  return (
    <div className={s.outerContainer}>
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
        <div className={s.info}>
          <div className={s.deliveryCard}>
            <div className={s.graphic}></div>
            <div className={s.text}>
              <h6>Repartidores</h6>
              <p>2/10 Habilitados</p>
            </div>
            <div className={s.button}>
              <button className={s.button}>VER</button>
            </div>
          </div>
          <hr />
          <div className={s.deliveryCard}>
            <div className={s.graphic}></div>
            <div className={s.text}>
              <h6>Paquetes</h6>
              <p>16/20 Habilitados</p>
            </div>
            <div className={s.buttonContainer}>
              <button className={s.button}>VER</button>
            </div>
          </div>
        </div>
      </div>
      <button className={s.bottomButton}>
        Nuevo paquete <Plus />
      </button>
    </div>
  );
};

export default ManageOrders;
