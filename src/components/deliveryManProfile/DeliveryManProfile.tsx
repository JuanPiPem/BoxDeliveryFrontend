import React from "react";
import s from "./deliveryManProfile.module.scss";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";
import TableListPackages from "commons/tableListPackages/TableListPackages";
import Vector from "assets/img/Vector";
import DeployArrowDown from "assets/img/DeployArrowDown";

const DeliveryManProfile = () => {
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.navBar}>
        <Navbar />
      </div>
      <div className={s.addPackagesContentContainer}>
        <div className={s.header}>
          <Header text="Gestionar Pedidos" />
        </div>
        <div className={s.welcomeCardContainer}>
          <div className={s.welcomeCard}>
            <div className={s.profileImage} />
            <div className={s.textContainer}>
              <h5>Farid</h5>
              <p>Habilitado</p>
            </div>
          </div>
        </div>
        <div className={s.packagesList}>
          <div className={s.packagesNumber}>58 paquetes entregados</div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.hr} />
          <div className={s.boxTrash}>
            <TableListPackages viewType="paquetes-admin" section="" status="" />
          </div>
          <hr className={s.lastHr} />
          <div className={s.vector}>
            <Vector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManProfile;
