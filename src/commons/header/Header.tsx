import React from "react";
import s from "./header.module.scss";
import { Saira } from "next/font/google";
import LeftArrow from "assets/img/LeftArrow";

const saira = Saira({ weight: "700", subsets: ["latin"] });

const Header: React.FC<Props> = ({ text, showArrow = true }): JSX.Element => {
  const contentStyles = showArrow
    ? { justifyContent: "space-between" }
    : { justifyContent: "center" };
  return (
    <div className={`${s.headerContainer} ${saira.className}`}>
      <div className={s.contentContainer}>
        <div className={s.content} style={contentStyles}>
          {text}
          {showArrow && <LeftArrow />}
        </div>
      </div>
    </div>
  );
};

type Props = {
  text: string;
  showArrow?: boolean;
};
export default Header;
