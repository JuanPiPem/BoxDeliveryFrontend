import React from "react";
import s from "./header.module.scss";
import { Saira } from "next/font/google";
import PropTypes from "prop-types";
import LeftArrow from "assets/img/LeftArrow";

const saira = Saira({ weight: "700", subsets: ["latin"] });

const Header = ({ text = "" }): JSX.Element => {
  return (
    <div className={`${s.headerContainer} ${saira.className}`}>
      <div className={s.contentContainer}>
        <div className={s.content}>
          {text}
          <LeftArrow />
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Header;
