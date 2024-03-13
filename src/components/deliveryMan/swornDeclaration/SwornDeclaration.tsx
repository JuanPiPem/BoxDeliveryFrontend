"use client";
import React, { useState, ChangeEvent } from "react";
import Header from "commons/header/Header";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import s from "./swornDeclaration.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useRouter } from "next/navigation";
import { removeUser } from "../../../state/user";
import { userServiceLogout } from "services/user.service";

const SwornDeclaration = () => {
  const [cuestionA, setCuestionA] = useState("");
  const [cuestionB, setCuestionB] = useState("");
  const [cuestionC, setCuestionC] = useState("");

  const user = useSelector((state: RootState) => state.user); // Acceder a la información del usuario
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement>,
    cuestion: string
  ) => {
    const selectedOption = event.target.value;
    if (cuestion === "A") {
      setCuestionA(selectedOption);
    } else if (cuestion === "B") {
      setCuestionB(selectedOption);
    } else if (cuestion === "C") {
      setCuestionC(selectedOption);
    }
  };

  const handleLogout = () => {
    dispatch(removeUser());
    userServiceLogout()
      .then(() => navigate.push("/login"))
      .catch((err) => console.error(err));
  };

  const handleSumit = () => {
    if (cuestionA === "si" || cuestionA === "")
      alert(
        "Usted cumple con una condicion por ende se le restringe la jornada"
      );
    handleLogout();
    if (cuestionB === "si" || cuestionB === "")
      alert(
        "Usted cumple con una condicion por ende se le restringe la jornada"
      );
    handleLogout();
    if (cuestionC === "si" || cuestionC === "")
      alert(
        "Usted cumple con una condicion por ende se le restringe la jornada"
      );
    handleLogout();

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/deliveryman-status`,
        { email: user.email },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        alert("usted puede iniciar su jornada");
        navigate.push("/delivery-man/start-work-day");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <div className={s.swornDeclarationContainer}>
        <Header text="declaración jurada" />
        <div className={s.declarationContainer}>
          <div>
            <div className={s.span}>Requerido*</div>
            <form action="" className={s.cuestion}>
              <text>
                ¿Ha consumido bebidas alcohólicas en las últimas 12 horas?
              </text>
              <div className={s.line}></div>
              <div className={s.customRadio}>
                <label htmlFor="">
                  {" "}
                  <input
                    onChange={(e) => handleOptionChange(e, "A")}
                    type="radio"
                    name="response"
                    id=""
                    value="si"
                  />
                  si{" "}
                </label>

                <label htmlFor="">
                  {" "}
                  <input
                    onChange={(e) => handleOptionChange(e, "A")}
                    type="radio"
                    name="response"
                    id=""
                    value="no"
                  />
                  no{" "}
                </label>
              </div>
            </form>
          </div>

          <div>
            <div className={s.span}>Requerido*</div>
            <form action="" className={s.cuestion}>
              <text>
                ¿Usted está haciendo uso de algún tipo de medicamento
                psicoactivo?
              </text>
              <p>
                por ejemplo, tranquilizantes, antigripales, antialergicos o para
                insomnios
              </p>
              <div className={s.line}></div>
              <div className={s.customRadio}>
                <label htmlFor="">
                  {" "}
                  <input
                    onChange={(e) => handleOptionChange(e, "B")}
                    type="radio"
                    name="response"
                    id=""
                    value="si"
                  />
                  si{" "}
                </label>

                <label htmlFor="">
                  {" "}
                  <input
                    onChange={(e) => handleOptionChange(e, "B")}
                    type="radio"
                    name="response"
                    id=""
                    value="no"
                  />
                  no{" "}
                </label>
              </div>
            </form>
          </div>

          <div>
            <div className={s.span}>Requerido*</div>
            <form action="" className={s.cuestion}>
              <text>
                ¿Tiene usted algún problema familiar, emocional o de cualquier
                tipo que lo distraiga?
              </text>
              <div className={s.line}></div>
              <div className={s.customRadio}>
                <label htmlFor="">
                  {" "}
                  <input
                    onChange={(e) => handleOptionChange(e, "C")}
                    type="radio"
                    name="response"
                    id=""
                    value="si"
                  />
                  si{" "}
                </label>

                <label htmlFor="">
                  {" "}
                  <input
                    onChange={(e) => handleOptionChange(e, "C")}
                    type="radio"
                    name="response"
                    id=""
                    value="no"
                  />
                  no{" "}
                </label>
              </div>
            </form>
          </div>

          <div className={s.btnContinue} onClick={handleSumit}>
            <ButtonDarkBlue text="continuar" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwornDeclaration;
