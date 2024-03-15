import Unchecked from "assets/img/Unchecked";
import s from "./selectPackage.module.scss";
import React, { useEffect, useState } from "react";
import Checked from "assets/img/Checked";
import Link from "next/link";

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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    if (typeof window !== "undefined") {
      const storedIds = localStorage.getItem("selectedIds");
      const ids = storedIds ? JSON.parse(storedIds) : [];
      const index = ids.indexOf(prop.package.id);
      if (index !== -1) {
        ids.splice(index, 1);
      } else {
        ids.push(prop.package.id);
      }
      localStorage.setItem("selectedIds", JSON.stringify(ids));
      setSelectedIds(ids);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIds = localStorage.getItem("selectedIds");
      if (!storedIds) {
        return setChecked(false);
      }
      const ids = JSON.parse(storedIds);
      const isChecked = ids.includes(prop.package.id);
      setChecked(isChecked);
    }
  }, [checked, prop.package.id, selectedIds]);

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
