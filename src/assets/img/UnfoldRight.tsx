import React from "react";

export default function UnfoldRight(props: {
  width?: number;
  height?: number;
}) {
  const { width, height } = props;
  return (
    <svg
      width={width || "19"}
      height={height || "20"}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 37420">
        <path
          id="Polygon 5"
          d="M12.9706 10.7924C13.4906 10.3921 13.4906 9.6079 12.9706 9.20759L8.85999 6.04322C8.20243 5.53703 7.25 6.00579 7.25 6.83563L7.25 13.1644C7.25 13.9942 8.20243 14.463 8.85999 13.9568L12.9706 10.7924Z"
          stroke="#24424D"
          stroke-linejoin="round"
        />
        <rect
          id="Rectangle 39549"
          x="-0.5"
          y="0.5"
          width="18"
          height="19"
          rx="4.5"
          transform="matrix(-1 0 0 1 18 0)"
          stroke="#24424D"
        />
      </g>
    </svg>
  );
}
