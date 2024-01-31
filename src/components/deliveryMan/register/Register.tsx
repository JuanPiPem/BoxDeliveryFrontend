"use client";

import React, { useState, ChangeEvent } from "react";
import s from "./register.module.scss";
import Header from "commons/header/Header";
import UploadImage from "assets/img/UploadImage";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Link from "next/link";
import Eye from "assets/img/Eye";
import ClosedEye from "assets/img/ClosedEye";

interface FormData {
  name: string;
  last_name: string;
  email: string;
  password: string;
  rep_password: string;
  [key: string]: string;
}

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Ingrese un correo electrónico válido.");
      return;
    }

    const frontNames = {
      name: "Nombre",
      last_name: "Apellido",
      email: "Email",
      password: "Contraseña",
      rep_password: "Repetir Contraseña",
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
    }
    // Lo muestro en el return
    // if (formData.password !== formData.rep_password) {
    //   setError("Las contraseñas no coinciden.");
    //   return;
    // }

    // if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(formData.password)) {
    //   setError("La contraseña debe cumplir los requisitos.");
    //   return;
    // }

    // Aquí puedes realizar la llamada a tu servicio de registro
    // y manejar la lógica de éxito o error como se muestra en tu código comentado.
  };

  //   let temp = { ...formData };
  //   userServiceRegister(temp)
  //     .then(() => {
  //       Swal.fire({
  //         title: "Usuario creado con éxito!",
  //         text: "Revisa tu correo para confirmar tu cuenta.",
  //         icon: "success",
  //       }).then(() => {
  //         navigate.push("/login");
  //       });
  //     })
  //     .catch((err) => {
  //       if (err.response.data === "Email already exists") {
  //         setError("Esta cuenta ya existe. Inicia sesión.");
  //       } else if (err.response.data === "DNI already exists") {
  //         setError(
  //           "Ya se encuentra registrada una cuenta con ese Dni. Inicia sesión."
  //         );
  //       } else setError("Error al intentar registrarse.");
  //     });
  // };

  return (
    <div className={s.registerContainer}>
      <Header text="Creá tu cuenta" />
      <div className={s.contentContainer}>
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
                error && !formData.name
                  ? `${s.errorText} ${s.placeholderText}`
                  : `${s.normalText} ${s.placeholderText}`
              }
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              autoFocus
            />

            <input
              type="text"
              placeholder={
                error && !formData.last_name
                  ? "Ingrese su Apellido"
                  : "Apellido"
              }
              value={formData.last_name}
              onChange={(e) => handleInputChange(e, "last_name")}
            />

            <input
              type="email"
              placeholder={
                error && !formData.email
                  ? "Ingrese un email valido."
                  : "ejemplo@email.com"
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
                onChange={(e) => handleInputChange(e, "password")}
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
                onChange={(e) => handleInputChange(e, "rep_password")}
              />
              <div
                className={s.eyeContainer}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <ClosedEye /> : <Eye />}
              </div>
              {/* {error && <div className={s.errorText}>{error}</div>} */}

              {formData.password !== formData.rep_password && (
                <div className={s.errorText}>Las contraseñas no coinciden.</div>
              )}
              {!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(
                formData.password
              ) &&
                ""
                // <div className={s.errorText}>
                //   Las contraseña debe contener 8 caracteres.
                // </div>
              }
            </div>
          </form>
          <div className={s.firstButtonContainer} onClick={handleSubmit}>
            <Link href={"/send-email"}>
              <ButtonDarkBlue text="Crear" />
            </Link>
          </div>
          <Link href={"/delivery-man/start-work-day"}>
            <button className={s.loginButton}>Iniciar sesión</button>
          </Link>
          <Link href={"/login"}>
            <p className={s.link}>¿Ya tenés una cuenta?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
