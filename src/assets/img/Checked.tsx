import React from "react";

export default function Checked(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      width={width || 19}
      height={height || 19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 37387">
        <rect
          id="Rectangle 39539"
          width="19"
          height="19"
          rx="9.5"
          fill="#CEF169"
        />
        <path
          id="Vector"
          d="M5 10.2L7.57143 13L14 6"
          stroke="#24424D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}
