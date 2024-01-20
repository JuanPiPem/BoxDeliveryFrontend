import React from "react";
import s from "./header.module.scss";
import { Saira } from "next/font/google";
import PropTypes from "prop-types";

const saira = Saira({ weight: "700", subsets: ["latin"] });

const Header = ({ text = "" }): JSX.Element => {
  return (
    <div className={`${s.headerContainer} ${saira.className}`}>
      <div className={s.contentContainer}>
        <div className={s.content}>
          {text}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.0366 7.35815C14.5807 7.29356 15 6.88545 15 6.39162C15 5.85291 14.501 5.41619 13.8854 5.41619L3.90271 5.41619L7.6712 1.85182L7.78193 1.73048C8.11426 1.30686 8.07879 0.704673 7.67464 0.319076C7.23007 -0.10508 6.50774 -0.106542 6.06127 0.315812L0.335864 5.732L0.224835 5.85371C-0.108248 6.27866 -0.0712385 6.88289 0.335864 7.268L6.06127 12.6842L6.18946 12.7889C6.63678 13.1028 7.27048 13.0665 7.67464 12.6809L7.78482 12.5591C8.11525 12.1342 8.07708 11.5321 7.6712 11.1482L3.67578 7.36706L13.8854 7.36706L14.0366 7.35815Z"
              fill="#24424D"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Header;
