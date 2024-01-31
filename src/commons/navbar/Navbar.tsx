import React from "react";
import s from "./navbar.module.scss";
import Box from "assets/img/Box";
import Link from "next/link";

const Navbar = () => {
  const loggedIn = true;
  const isAdmin = true;
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
          <Link href={"/login"}>
            <button style={{ display: loggedIn ? `block` : `none` }}>
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
