import React from "react";
import s from "./tableListPackages.module.scss";
import Package from "assets/img/Package";
import Trash from "assets/img/Trash";
import StatusInProgress from "assets/img/StatusInProgress";

const TableListPackages = () => {
  return (
    <>
      <div className={`${s.container}`}>
        <div className={`${s.div1}`}>
          <Package />
          <div className={`${s.div2}`}>
            <p className={`${s.txt} ${s.fontBold}`}>#0A235</p>
            <p className={`${s.txt} ${s.fontNormal}`}>Amenabar2356,</p>
            <p className={`${s.txt} ${s.fontNormal}`}>CABA</p>
          </div>
        </div>
        <div className={`${s.div3}`}>
          <div className={`${s.statusContainer}`}>
            <StatusInProgress />
            <p className={`${s.div3Aling} ${s.statusText}`}>EN CURSO</p>
          </div>
          <div className={`${s.div3Aling}`}>
            <Trash />
          </div>
          <div style={{ display: "none" }}>
            <button className={`${s.button}`}>Iniciar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableListPackages;
