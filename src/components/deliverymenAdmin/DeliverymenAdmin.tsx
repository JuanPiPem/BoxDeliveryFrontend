import React from "react";
import s from "./deliverymenAdmin.module.scss";
import Navbar from "commons/navbar/Navbar";
import Header from "commons/header/Header";
import ColorPoint from "assets/img/ColorPoint";
import PercentageGraph from "assets/img/PercentageGraph";
import Vector from "assets/img/Vector";

const DeliverymenAdmin = () => {
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
  ];
  return (
    <>
      <Navbar />
      <Header text="REPARTIDORES" />
      <div className={s.repartidores}>
        <div className={s.headList}>
          <div>
            <h1>Enero </h1>
            <h1> mie / 03</h1>
          </div>
        </div>
        {arrayFakeData.map((objeto) => (
          <div className={s.contentUser} key={objeto.level + 1}>
            <div className={s.percentage}>
              <PercentageGraph level={objeto.level} />
            </div>

            <div className={s.nameAndState}>
              <div>{objeto.name}</div>
              <div className={s.ProfileState}>
                {" "}
                <ColorPoint state={objeto.state} /> {objeto.state}
              </div>
            </div>
            <div className={s.profilePicture}></div>
          </div>
        ))}
        <div className={s.vector}>
          <Vector />
        </div>
      </div>
    </>
  );
};

export default DeliverymenAdmin;
