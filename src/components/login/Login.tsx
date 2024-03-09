"use client";
import React, { useState } from "react";
import s from "./login.module.scss";
import LoginBoxLogo from "assets/img/LoginBoxLogo";
import ButtonDarkBlue from "commons/buttonDarkBlue/ButtonDarkBlue";
import Eye from "assets/img/Eye";
import ClosedEye from "assets/img/ClosedEye";
import Link from "next/link";
import { AxiosError } from "axios";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "../../state/user";
import { userServiceLogin } from "services/user.service";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!userData.email || !userData.password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    userServiceLogin(userData)
      .then((user) => {
        dispatch(setUser(user.data));
        return user.data;
      })
      .then((user) => {
        if (user.is_admin) {
          navigate.push("/admin/delivery-men");
        } else if (!user.is_admin) {
          navigate.push("/delivery-man/start-work-day");
        }
      })
      .catch((error: Error | AxiosError) => {
        let errorMessage = "Error al intentar loguearse.";
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response?.status === 412
        )
          errorMessage =
            "Esta cuenta todavía no está confirmada. Revise su correo.";
        setError(errorMessage);
      });
  };
  return (
    <div className={s.loginContainer}>
      <div className={s.loginContentContainer}>
        <div className={s.content}>
          <input
            type="email"
            name="email"
            value={userData.email}
            className={s.input}
            id={s.margin1}
            placeholder="Correo electronico"
            autoFocus
            onChange={handleInputChange}
          />
          <div className={s.inputPasswordContainer}>
            <input
              type={showPassword ? `text` : `password`}
              name="password"
              value={userData.password}
              className={`${s.input}`}
              id={s.margin2}
              placeholder="Contraseña"
              onChange={handleInputChange}
            />
            <div
              className={s.eyeContainer}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <ClosedEye /> : <Eye />}
            </div>
          </div>
          <div className={s.buttonLogin} onClick={handleSubmit}>
            <ButtonDarkBlue text="Ingresar" />
          </div>
          <Link href={"/delivery-man/register"}>
            <div style={{ width: "100%" }}>
              <button className={s.buttonSignUp}>Crear Cuenta</button>
            </div>
          </Link>
          <Link href={"/send-email"}>
            <button className={s.buttonRecoverPassword}>
              Olvidé mi contraseña
            </button>
          </Link>
        </div>
        <div className={s.logoContainer}>
          <LoginBoxLogo />
        </div>
      </div>
      <div className={s.background}></div>
      <Toaster richColors position="top-center" expand={true} />
    </div>
  );
};

export default Login;
