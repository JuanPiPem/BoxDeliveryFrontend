import Unchecked from "assets/img/Unchecked";
import s from "./selectPackage.module.scss";
import React from "react";
import Checked from "assets/img/Checked";

type Prop = {
  address: string;
  checked: boolean;
};

function SelectPackage(prop: Prop) {
  return (
    <>
      <div className={s.addressList}>
        {prop.checked ? <Checked /> : <Unchecked />}

        <div className={s.address}>{prop.address}</div>
      </div>
    </>
  );
}

export default SelectPackage;
