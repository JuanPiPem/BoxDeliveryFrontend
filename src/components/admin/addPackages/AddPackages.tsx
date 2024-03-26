"use client";

import React, { ChangeEvent, useState } from "react";
import s from "./addPackages.module.scss";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Header from "commons/header/Header";
import { packageServiceAddPackage } from "services/package.service";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
const libraries: ("places" | "geometry")[] = ["places", "geometry"];

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
  const handleCalendarInput = (e: ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value;
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getDay();

    // Si la fecha seleccionada es sábado (5) o domingo (6)
    if (dayOfWeek === 6 || dayOfWeek === 5) {
      toast.warning("Por favor, seleccione una fecha entre lunes y viernes.");
      e.target.value = ""; // Limpiar el input
    } else {
      setFormData((prevFormData) => {
        return { ...prevFormData, ["date"]: day };
      });
    }
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDg3IuEpz0H54GXQnfgPVZx37xiqax5J48",
    libraries,
  });
  if (loadError) return <div>Error al cargar la API de Google Maps</div>;
  if (!isLoaded) return <div>Cargando la API de Google Maps...</div>;

  console.log("guardado de direccion =>", formData.address)
  return (
    <div className={s.addPackagesContainer}>
      <div className={s.addPackagesContentContainer}>
        <Header text="Agregar Paquetes" />
        <div className={s.form}>
          <div className={s.content}>
            <form>
              <Autocomplete
                onLoad={() => {}}
              >
                <input
                  type="text"
                  placeholder="Dirección"
                  onChange={(e) => handleInputChange(e, "address")}
                  className={s.input}
                  autoFocus
                />
              </Autocomplete>
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
              onChange={(e) => handleCalendarInput(e)}
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
