"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "commons/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { userServiceMe } from "services/user.service";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const [role, setRole] = useState("");
  useEffect(() => {
    userServiceMe()
      .then((user) => {
        if (user) {
          return user.is_admin ? setRole("admin") : setRole("delivery-man");
        }
      })
      .catch(() => {
        console.error();
      });
  }, [role, user]);

  return (
    <>
      {user.id ? <Navbar /> : null}
      {role === "admin" ? (
        children
      ) : (
        <div className="unauthorizedDiv">
          <h3>Error 401:</h3>
          <p className="unathorizedP">
            No esta autorizado para acceder a esta pagina
          </p>
          <Link
            href={
              role === "delivery-man"
                ? "/delivery-man/start-work-day"
                : "/login"
            }
          >
            <button>
              Ir al {role === "delivery-man" ? "inicio" : "login"}{" "}
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
