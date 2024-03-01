"use client";

import React, { useState } from "react";
import s from "./confirmEmail.module.scss";
import { MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";

import Header from "commons/header/Header";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const ConfirmEmail = () => {
  const params = useParams();
  const [stepper, setStepper] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/users/confirm-email/${params.token}`, {
        withCredentials: true,
      })
      .then(() => setStepper(2))
      .catch((err) => {
        console.error(err);
        setStepper(3);
      });
  };
  return (
    <div className={s.outerContainer}>
      <Header text="Confirmar cuenta" showArrow />
      <div className={s.contentContainer}>
        <div className={s.content}>
          {stepper === 1 ? (
            <>
              <IconContext.Provider value={{ size: "3.8em", color: "#ef7709" }}>
                <div className={s.svgContainer}>
                  <MdEmail />
                </div>
              </IconContext.Provider>
              <div className={s.textContainer}>
                <h2>Ya casi estamos!</h2>
                <p>Haz click en el siguiente boton</p>
              </div>
              <div className={s.buttonContainer}>
                <button className={s.button} onClick={handleSubmit}>
                  Confirmar correo
                </button>
              </div>
            </>
          ) : stepper === 2 ? (
            <>
              <IconContext.Provider value={{ size: "3.2em", color: "#ef7709" }}>
                <div
                  className={`${s.svgContainer} ${
                    stepper === 2 ? s.fadeInAnimation : ""
                  }`}
                >
                  <FaCheckCircle />
                </div>
              </IconContext.Provider>
              <div className={s.textContainer}>
                <h2>Todo listo!</h2>
                <p id={s.small}>Comenza a difrutar nuestra plataforma</p>
              </div>
              <div className={s.buttonContainer}>
                <Link href={`/login`}>
                  <button className={s.button}>Inciar sesion</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <IconContext.Provider value={{ size: "4em", color: "#ef7709" }}>
                <div
                  className={`${s.svgContainer} ${
                    stepper === 3 ? s.fadeInAnimation : ""
                  }`}
                >
                  <BiSolidError />
                </div>
              </IconContext.Provider>
              <div className={s.textContainer}>
                <h2>Ocurrio un error!</h2>
                <p id={s.small}>Intente nuevamente por favor</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
