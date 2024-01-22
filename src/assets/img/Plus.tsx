import React from "react";

export default function Plus(props: { width?: number; height?: number }) {
  const { width, height } = props;
  return (
    <svg
      width={width || "14"}
      height={height || "14"}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M13 7.00005L7 7.00005M7 7.00005L1 7.00005M7 7.00005L7 1M7 7.00005L7 13"
        stroke="#CEF169"
        stroke-linecap="round"
      />
    </svg>
  );
}
