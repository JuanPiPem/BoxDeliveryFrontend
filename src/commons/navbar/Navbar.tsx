import React from "react";
import s from "./navbar.module.scss";
import Box from "assets/img/Box";

const Navbar = () => {
  const loggedIn = true;
  return (
    <div className={s.navbarContainer}>
      <div className={s.contentContainer}>
        <div className={s.content}>
          <Box />
          <button style={{ display: loggedIn ? `block` : `none` }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
