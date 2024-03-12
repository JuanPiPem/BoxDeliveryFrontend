"use client";

import React, { ChangeEvent, useState } from "react";
import s from "./addPackages.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Header from "commons/header/Header";
import { packageServiceAddPackage } from "services/package.service";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const AddPackages = () => {
  type FormData = {
    address: string;
    receiver_name: string;
    date: string;
    weight: number | string;
    // [key: string]: string;
  };
  const [formData, setFormData] = useState<FormData>({
    address: "",
    receiver_name: "",
    date: "",
    weight: 0,
  });
  const router = useRouter();
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ): void => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [fieldName]: value };
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.receiver_name === "" ||
      formData.weight === 0 ||
      formData.weight === "" ||
      formData.address === "" ||
      formData.date === ""
    )
      return toast.warning("Complete todos los campos por favor");
    try {
      await packageServiceAddPackage(formData);
      toast.success("Paquete agregado exitosamente!");
      return setTimeout(() => {
        router.push("/admin/packages");
      }, 1000);
    } catch (error) {
      return toast.error("Error al intentar agregar el paquete");
    }
  };
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <Header text="Agregar Paquetes" />
        <div className={s.form}>
          <div className={s.content}>
            <form>
              <input
                type="text"
                className={`${s.input}`}
                placeholder="Dirección"
                onChange={(e) => handleInputChange(e, "address")}
                autoFocus
              />
              <input
                type="text"
                className={`${s.input}`}
                placeholder="Nombre de quien recibe"
                onChange={(e) => handleInputChange(e, "receiver_name")}
              />
              <input
                type="number"
                className={`${s.input}`}
                placeholder="Peso del paquete (Kg)"
                step="0.01"
                onChange={(e) => handleInputChange(e, "weight")}
              />
            </form>
          </div>
          <div className={`${s.content} ${s.divDate}`}>
            <label htmlFor="deadLine" className={`${s.labelInputDate}`}>
              Fecha de entrega
            </label>
            <input
              type="date"
              id="deadLine"
              className={`${s.inputDate}`}
              min={`${year}-${month}-${day}`}
              onChange={(e) => handleInputChange(e, "date")}
            />
          </div>
        </div>
        <div className={`${s.button}`} onClick={handleSumbit}>
          <ButtonDarkBlue text="Agregar" />
        </div>
      </div>
      <Toaster richColors expand={false} position="top-center" />
    </div>
  );
};

export default AddPackages;
