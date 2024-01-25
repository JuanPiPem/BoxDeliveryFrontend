import React from "react";

export default function UnfoldLeft(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      width={width || "19"}
      height={height || "20"}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 37419">
        <path
          id="Polygon 5"
          d="M6.02937 10.7924C5.50936 10.3921 5.50936 9.6079 6.02937 9.20759L10.14 6.04322C10.7976 5.53703 11.75 6.00579 11.75 6.83563L11.75 13.1644C11.75 13.9942 10.7976 14.463 10.14 13.9568L6.02937 10.7924Z"
          stroke="#24424D"
          strokeLinejoin="round"
        />
        <rect
          id="Rectangle 39549"
          x="0.5"
          y="0.5"
          width="18"
          height="19"
          rx="4.5"
          stroke="#24424D"
        />
      </g>
    </svg>
  );
}
