import Unchecked from "assets/img/Unchecked";
import s from "./selectPackage.module.scss";
import React, { useState } from "react";
import Checked from "assets/img/Checked";
import Link from "next/link";
import { useDispatch /*useSelector*/ } from "react-redux";
import { setCheckedPackages } from "state/packages";
// import { RootState } from "state/store";

type Prop = {
  package: typePackage;
};

type typePackage = {
  id: string;
  receiver_name: string;
  status: string;
  address: string;
  date: string;
  weight: number;
  user_id: number;
};

function SelectPackage(prop: Prop) {
  // const checkedPackageIds = useSelector(
  //   (state: RootState) => state.checkedPackages
  // );
  // console.log(`🚀 - checkedPackageIds:`, checkedPackageIds);

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
    dispatch(setCheckedPackages({ id: prop.package.id }));
  };

  return (
    <div className={s.addressListContainer}>
      <div className={s.addressList}>
        <div className={s.checkedContainer} onClick={handleClick}>
          {checked ? <Checked /> : <Unchecked />}
        </div>
        <Link href={`/delivery-man/delivery-in-progress/${prop.package.id}`}>
          <div className={s.address}>{prop.package.address}</div>
        </Link>
      </div>
    </div>
  );
}

export default SelectPackage;
