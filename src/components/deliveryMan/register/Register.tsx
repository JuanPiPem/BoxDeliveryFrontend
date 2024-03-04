"use client";

import ClosedEye from "assets/img/ClosedEye";
import Eye from "assets/img/Eye";
import UploadImage from "assets/img/UploadImage";
import axios from "axios";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Header from "commons/header/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Toaster, toast } from "sonner";
import s from "./register.module.scss";

interface FormData {
  name: string;
  last_name: string;
  email: string;
  password: string;
  rep_password: string;
  [key: string]: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [visitedInput1, setVisitedInput1] = useState(false);
  const [visitedInput2, setVisitedInput2] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    last_name: "",
    email: "",
    password: "",
    rep_password: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ): void => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [fieldName]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setError(null);
    setVisitedInput1(true);
    setVisitedInput2(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Ingrese un correo electronico valido");
      return;
    }
    if (formData.password !== formData.rep_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(formData.password)) {
      setError("La contraseña debe cumplir los requisitos.");
      return;
    }

    const frontNames = {
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      rep_password: formData.rep_password,
    };
    const mustHave = ["name", "last_name", "email", "password", "rep_password"];
    const missing = mustHave.filter((field) => !formData[field]);

    if (missing.length > 0) {
      const message =
        missing.length === 1
          ? `Completar el campo ${
              frontNames[missing[0] as keyof typeof frontNames]
            }.`
          : `Completar los campos ${missing
              .slice(0, -1)
              .map(
                (field) => ` ${frontNames[field as keyof typeof frontNames]}`
              )
              .join(",")}${missing.length > 1 ? " y" : ""} ${
              frontNames[missing[missing.length - 1] as keyof typeof frontNames]
            }.`;
      setError(message);

      return;
    } else {
      setLoader(true);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/register`,
          formData,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLoader(false);
          router.push("/login");
          setTimeout(() => {
            toast.success(
              "Registro exitoso, revisa tu casilla de mail para confirmar tu correo",
              {
                duration: 10000,
              }
            );
          }, 200);
        })
        .catch((err) => {
          setLoader(false);
          if (
            err.response?.data ===
            "Error: Account already associated with this email"
          ) {
            return toast.info("Ya existe una cuenta asociada a ese correo", {
              duration: 5000,
              action: {
                label: "Iniciar sesion",
                onClick: () => router.push("/login"),
              },
            });
          }
          toast.error(err.response?.data);
        });
    }
  };

  return (
    <div className={s.registerContainer}>
      <Header text="Creá tu cuenta" />
      <div className={`${s.contentContainer} ${loader && s.blur}`}>
        <div className={s.layer}>
          <div className={s.content}>
            <div className={s.iconContainer}>
              <UploadImage />
            </div>
            <form
              onSubmit={handleSubmit}
              action="submint"
              className={s.registerForm}
            >
              <input
                type="text"
                placeholder={
                  error && !formData.name ? "Ingrese su Nombre." : "Nombre"
                }
                className={
                  error && !formData.name ? `${s.errorText}` : `${s.normalText}`
                }
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
                autoFocus
              />

              <input
                type="text"
                placeholder={
                  error && !formData.last_name
                    ? "Ingrese su Apellido."
                    : "Apellido"
                }
                className={
                  error && !formData.last_name
                    ? `${s.errorText}`
                    : `${s.normalText}`
                }
                value={formData.last_name}
                onChange={(e) => handleInputChange(e, "last_name")}
              />

              <input
                type="email"
                placeholder={
                  error && !formData.email
                    ? "Ingrese una direccion de email valida"
                    : !emailRegex.test(formData.email)
                    ? "ejemplo@email.com"
                    : "Ingrese un direccion de email valida."
                }
                className={
                  error && !formData.email
                    ? `${s.errorText}`
                    : `${s.normalText}`
                }
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
              />

              <div className={s.inputPasswordContainer}>
                <input
                  type={showPassword ? `text` : `password`}
                  className={s.inputPassword}
                  placeholder="**********"
                  value={formData.password}
                  onChange={(e) => {
                    setVisitedInput1(true);
                    return handleInputChange(e, "password");
                  }}
                  onClick={() => setVisitedInput1(true)}
                />
                <div
                  className={s.eyeContainer}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ClosedEye /> : <Eye />}{" "}
                </div>
              </div>
              <div className={s.inputPasswordContainer}>
                <input
                  type={showConfirmPassword ? `text` : `password`}
                  className={s.inputPassword}
                  placeholder="Confirmar contraseña"
                  value={formData.rep_password}
                  onChange={(e) => {
                    setVisitedInput2(true);
                    return handleInputChange(e, "rep_password");
                  }}
                  onClick={() => setVisitedInput2(true)}
                />
                <div
                  className={s.eyeContainer}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <ClosedEye /> : <Eye />}
                </div>
                {visitedInput2 &&
                  formData.password !== formData.rep_password && (
                    <div className={s.errorText}>
                      Las contraseñas no coinciden.
                    </div>
                  )}
                {!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(
                  formData.password
                ) &&
                  visitedInput1 && (
                    <div className={s.errorText}>
                      La contraseña debe contener 8 caracteres,
                      <br /> una Mayuscula, una minuscula y un numero.
                    </div>
                  )}
              </div>
            </form>
            <div className={s.firstButtonContainer} onClick={handleSubmit}>
              <ButtonDarkBlue text="Crear" />
            </div>
            <Link href={"/login"}>
              <button className={s.loginButton}>Iniciar sesión</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={s.loaderContainer}>
        <div
          className={s.spinner}
          style={{ display: loader ? "block" : "none" }}
        ></div>
      </div>
      <Toaster richColors expand={true} position="top-center" />
    </div>
  );
};

export default Register;
