"use client";

import React from "react";
import s from "./navbar.module.scss";
import Box from "assets/img/Box";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const loggedIn = true;
  const isAdmin = true;
  const handleLogout = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/logout`, null, {
        withCredentials: true,
      })
      .then(() => router.push("/login"))
      .catch((err) => console.error(err));
  };
  return (
    <div className={s.navbarContainer}>
      <div className={s.contentContainer}>
        <div className={s.content}>
          <Link
            href={
              isAdmin ? "/admin/manage-orders" : "/delivery-man/start-work-day"
            }
          >
            <Box />
          </Link>
          <button
            onClick={handleLogout}
            style={{ display: loggedIn ? `block` : `none` }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
